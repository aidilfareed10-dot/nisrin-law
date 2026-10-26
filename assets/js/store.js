/* Nisrin Law — data layer.
   Two modes, same API for the pages:
   • Supabase (assets/js/config.js filled in): real accounts and one shared database, so an enquiry
     sent from any device reaches staff, and case updates reach clients.
   • Local demo (config empty): everything stays in this browser, for previewing only.
   Pages read synchronously from Store.db; Store.commit() saves whatever changed. */
(function () {
  const FIRM_TZ = 'Asia/Kuala_Lumpur';
  const { AREAS, seed } = window.NL_SEED;
  const STAGES = ['Enquiry', 'Engagement & KYC', 'Case review', 'Pleadings / Negotiation', 'Hearing / Settlement', 'Closed'];
  const COLLS = ['users', 'matters', 'documents', 'messages', 'invoices', 'appointments', 'enquiries'];
  const LOCAL_KEY = 'nisrin_db_v1', LOCAL_SESSION = 'nisrin_session';

  const cfg = window.NL_CONFIG || {};
  const sb = cfg.supabaseUrl && cfg.supabaseKey && window.supabase ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseKey) : null;
  const MODE = sb ? 'supabase' : 'local';

  const uid = (p) => p + '_' + Math.random().toString(36).slice(2, 9);
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16); }));
  const daysFromNow = (d, h = 10, m = 0) => { const t = new Date(); t.setUTCDate(t.getUTCDate() + d); t.setUTCHours(h - 8, m, 0, 0); return t.toISOString(); };
  const empty = () => ({ settings: seed(daysFromNow).settings, users: [], matters: [], documents: [], messages: [], invoices: [], appointments: [], enquiries: [] });

  let db = empty();
  let session = null; // { userId }
  const listeners = new Set();
  const emit = () => listeners.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });

  // ===================== local demo driver =====================
  const Local = {
    load() {
      try { const raw = localStorage.getItem(LOCAL_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
      const d = seed(daysFromNow); Local.save(d); return d;
    },
    save(d) { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(d)); } catch (e) { console.warn('Could not save', e); } },
    async init() {
      db = Local.load();
      let id = null; try { id = sessionStorage.getItem(LOCAL_SESSION); } catch (e) {}
      session = id ? { userId: id } : null;
    },
    async login(email, password) {
      const u = db.users.find((x) => x.email.toLowerCase() === String(email).trim().toLowerCase() && x.password === password && !x.pending);
      if (!u) return { error: 'Email or password is incorrect.' };
      try { sessionStorage.setItem(LOCAL_SESSION, u.id); } catch (e) {}
      session = { userId: u.id };
      return { user: u };
    },
    async logout() { try { sessionStorage.removeItem(LOCAL_SESSION); } catch (e) {} session = null; },
    async signUp(data) {
      const existing = db.users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
      if (existing && !existing.pending) return { error: 'An account with this email already exists.' };
      const u = existing || { id: uid('u'), role: 'client', joined: new Date().toISOString() };
      Object.assign(u, data, { role: 'client', pending: false });
      if (!existing) db.users.push(u);
      Local.save(db);
      return Local.login(data.email, data.password);
    },
    async commit() { Local.save(db); return { ok: true }; },
    reset() { db = seed(daysFromNow); Local.save(db); },
  };

  // ===================== Supabase driver =====================
  // Every record lives in one table: records(coll, id, client_id, data jsonb).
  // Row-level security lets staff see everything and clients only rows with their own client_id.
  // Internal case notes are stored as separate staff-only rows so they never reach a client.
  let snapshot = new Map();
  const keyOf = (coll, id) => coll + '/' + id;

  function toRows(d) {
    const rows = new Map();
    const put = (coll, id, clientId, data) => rows.set(keyOf(coll, id), { coll, id: String(id), client_id: clientId || null, data });
    put('settings', 'firm', null, d.settings);
    for (const coll of COLLS) {
      for (const item of d[coll]) {
        if (coll === 'users') { const { password, ...rest } = item; put('users', item.id, item.role === 'client' ? item.id : null, rest); continue; }
        if (coll === 'matters') {
          const pub = (item.updates || []).filter((u) => !u.internal), priv = (item.updates || []).filter((u) => u.internal);
          put('matters', item.id, item.clientId, { ...item, updates: pub });
          if (priv.length || snapshot.has(keyOf('notes', item.id))) put('notes', item.id, null, { updates: priv });
          continue;
        }
        put(coll, item.id, coll === 'enquiries' ? null : item.clientId, item);
      }
    }
    return rows;
  }

  function fromRows(rows) {
    const d = empty();
    const notes = {};
    for (const r of rows) {
      if (r.coll === 'settings') d.settings = { ...d.settings, ...r.data };
      else if (r.coll === 'notes') notes[r.id] = r.data.updates || [];
      else if (d[r.coll]) d[r.coll].push({ ...r.data, id: r.id, ...(r.client_id && r.coll !== 'users' ? { clientId: r.client_id } : {}) });
    }
    for (const m of d.matters) if (notes[m.id]) m.updates = [...(m.updates || []), ...notes[m.id]];
    for (const coll of COLLS) d[coll].sort((a, b) => String(b.date || b.issued || b.opened || b.when || '').localeCompare(String(a.date || a.issued || a.opened || a.when || '')));
    return d;
  }

  // Replace contents but keep object identity, so open pages holding a record keep working.
  function mergeInto(target, fresh) {
    const sync = (o, f) => { for (const k of Object.keys(o)) if (!(k in f)) delete o[k]; return Object.assign(o, f); };
    sync(target.settings, fresh.settings);
    for (const coll of COLLS) {
      const old = new Map((target[coll] || []).map((x) => [x.id, x]));
      target[coll] = fresh[coll].map((f) => (old.has(f.id) ? sync(old.get(f.id), f) : f));
    }
  }

  const Remote = {
    async fetchAll() {
      const { data, error } = await sb.from('records').select('coll,id,client_id,data').limit(5000);
      if (error) throw error;
      mergeInto(db, fromRows(data));
      snapshot = new Map([...toRows(db)].map(([k, r]) => [k, JSON.stringify(r)]));
    },
    async init() {
      const { data } = await sb.auth.getSession();
      session = data.session ? { userId: data.session.user.id } : null;
      try { await Remote.fetchAll(); } catch (e) { console.error('Load failed', e); }
      sb.auth.onAuthStateChange((_evt, s) => { session = s ? { userId: s.user.id } : null; });
    },
    async login(email, password) {
      const { data, error } = await sb.auth.signInWithPassword({ email: String(email).trim(), password });
      if (error) return { error: error.message === 'Invalid login credentials' ? 'Email or password is incorrect.' : error.message };
      session = { userId: data.user.id };
      await Remote.fetchAll();
      const u = Store.current();
      return u ? { user: u } : { error: 'Signed in, but no profile was found for this account. Ask the firm to check your access.' };
    },
    async logout() { await sb.auth.signOut(); session = null; },
    async signUp(data) {
      const { password, email, ...meta } = data;
      const { data: res, error } = await sb.auth.signUp({ email: email.trim(), password, options: { data: meta } });
      if (error) return { error: error.message };
      if (!res.session) return { needsConfirmation: true };
      session = { userId: res.user.id };
      await Remote.fetchAll();
      return { user: Store.current() };
    },
    async commit() {
      const now = toRows(db);
      const inserts = [], updates = [], deletes = [];
      for (const [k, r] of now) {
        const json = JSON.stringify(r);
        if (!snapshot.has(k)) { if (r.coll === 'settings' && (Store.current() || {}).role !== 'admin') continue; inserts.push(r); }
        else if (snapshot.get(k) !== json) updates.push(r);
      }
      for (const k of snapshot.keys()) if (!now.has(k)) deletes.push(k.split('/'));
      const jobs = [];
      if (inserts.length) jobs.push(sb.from('records').insert(inserts));
      for (const r of updates) jobs.push(sb.from('records').update({ data: r.data, client_id: r.client_id, updated_at: new Date().toISOString() }).eq('coll', r.coll).eq('id', r.id));
      for (const [coll, id] of deletes) jobs.push(sb.from('records').delete().eq('coll', coll).eq('id', id));
      const results = await Promise.all(jobs);
      const failed = results.find((x) => x.error);
      if (failed) {
        console.error('Save failed', failed.error);
        window.dispatchEvent(new CustomEvent('store-error', { detail: failed.error.message }));
        return { error: failed.error.message };
      }
      snapshot = new Map([...now].map(([k, r]) => [k, JSON.stringify(r)]));
      return { ok: true };
    },
    // Live updates: reload when anyone changes a record this user can see.
    subscribe() {
      let t = null;
      sb.channel('records-live')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'records' }, () => {
          clearTimeout(t);
          t = setTimeout(async () => { try { await Remote.fetchAll(); emit(); } catch (e) { console.error(e); } }, 400);
        })
        .subscribe();
      // fallback poll in case realtime is not enabled on the project
      setInterval(async () => { if (document.hidden) return; const before = JSON.stringify(db); try { await Remote.fetchAll(); if (JSON.stringify(db) !== before) emit(); } catch (e) {} }, 30000);
    },
  };

  const driver = MODE === 'supabase' ? Remote : Local;
  let ready = null;

  const Store = {
    MODE, FIRM_TZ, AREAS, STAGES, uid,
    get db() { return db; },
    init() { return ready || (ready = driver.init()); },
    commit() { return driver.commit(); },
    onChange(fn) { listeners.add(fn); if (MODE === 'supabase' && listeners.size === 1) Remote.subscribe(); },
    reset() { if (MODE === 'local') Local.reset(); },
    demoAccounts: window.NL_SEED.DEMO,

    async login(email, password) { return driver.login(email, password); },
    async logout() { return driver.logout(); },
    async signUp(data) { return driver.signUp(data); },
    current() { return session ? db.users.find((u) => u.id === session.userId) || null : null; },
    require(role) {
      const u = Store.current();
      if (!u || u.role !== role) { location.href = 'login.html?role=' + role; return null; }
      return u;
    },
    // Staff create a client record before the client has a login; when the client later signs up
    // with the same email, the database links the account to these existing records.
    register(data) {
      if (db.users.some((u) => u.email.toLowerCase() === String(data.email).toLowerCase())) return { error: 'A client with this email already exists.' };
      const { password, ...rest } = data;
      const u = { id: MODE === 'supabase' ? uuid() : uid('u'), role: 'client', joined: new Date().toISOString(), lang: 'en', pending: true, ...rest };
      db.users.push(u); Store.commit();
      return { user: u };
    },

    // Public website enquiry — written straight to the database (visitors cannot read enquiries back).
    async submitEnquiry(item) {
      item.id = item.id || uid('e');
      if (MODE === 'local') { db = Local.load(); db.enquiries.unshift(item); Local.save(db); return { ok: true }; }
      const { error } = await sb.from('records').insert({ coll: 'enquiries', id: item.id, client_id: null, data: item });
      return error ? { error: error.message } : { ok: true };
    },

    // ---- helpers ----
    user: (id) => db.users.find((u) => u.id === id),
    clients: () => db.users.filter((u) => u.role === 'client'),
    byClient: (coll, id) => db[coll].filter((x) => x.clientId === id),
    add(coll, item) { item.id = item.id || uid(coll[0]); db[coll].unshift(item); Store.commit(); return item; },
    update(coll, id, patch) { const x = db[coll].find((i) => i.id === id); if (x) Object.assign(x, patch); Store.commit(); return x; },
    remove(coll, id) { db[coll] = db[coll].filter((i) => i.id !== id); Store.commit(); },
  };

  // ---------- formatting helpers shared by all pages ----------
  const Fmt = {
    date(iso, tz, opts) {
      return new Intl.DateTimeFormat('en-GB', { timeZone: tz || FIRM_TZ, day: 'numeric', month: 'short', year: 'numeric', ...opts }).format(new Date(iso));
    },
    time(iso, tz) {
      return new Intl.DateTimeFormat('en-GB', { timeZone: tz || FIRM_TZ, hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
    },
    dateTime(iso, tz) {
      return new Intl.DateTimeFormat('en-GB', { timeZone: tz || FIRM_TZ, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
    },
    tzLabel(tz) {
      try {
        const p = new Intl.DateTimeFormat('en-GB', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(new Date());
        const off = (p.find((x) => x.type === 'timeZoneName') || {}).value || '';
        return tz.split('/').pop().replace(/_/g, ' ') + ' (' + off + ')';
      } catch (e) { return tz; }
    },
    money(myr, cur) {
      cur = cur || 'MYR';
      const rate = (db.settings.rates || {})[cur] || 1;
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: cur, maximumFractionDigits: cur === 'JPY' || cur === 'IDR' ? 0 : 2 }).format(myr * rate);
    },
    size(b) { return b > 1e6 ? (b / 1e6).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; },
    ago(iso) {
      const s = (Date.now() - new Date(iso).getTime()) / 1000;
      if (s < 60) return 'just now';
      if (s < 3600) return Math.floor(s / 60) + ' min ago';
      if (s < 86400) return Math.floor(s / 3600) + ' h ago';
      return Math.floor(s / 86400) + ' d ago';
    },
    esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); },
  };

  // Common time zones for international clients.
  const TIMEZONES = [
    'Asia/Kuala_Lumpur', 'Asia/Singapore', 'Asia/Jakarta', 'Asia/Bangkok', 'Asia/Hong_Kong', 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Seoul',
    'Asia/Kolkata', 'Asia/Dubai', 'Asia/Riyadh', 'Asia/Qatar', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Amsterdam',
    'Europe/Zurich', 'Europe/Istanbul', 'Africa/Johannesburg', 'Africa/Lagos', 'America/New_York', 'America/Chicago', 'America/Los_Angeles',
    'America/Toronto', 'America/Sao_Paulo', 'Australia/Perth', 'Australia/Sydney', 'Pacific/Auckland',
  ];

  const COUNTRIES = [
    ['Malaysia', '+60'], ['Singapore', '+65'], ['Indonesia', '+62'], ['Brunei', '+673'], ['Thailand', '+66'], ['China', '+86'], ['Hong Kong', '+852'],
    ['Japan', '+81'], ['South Korea', '+82'], ['India', '+91'], ['United Arab Emirates', '+971'], ['Saudi Arabia', '+966'], ['Qatar', '+974'],
    ['United Kingdom', '+44'], ['Ireland', '+353'], ['Germany', '+49'], ['France', '+33'], ['Netherlands', '+31'], ['Switzerland', '+41'],
    ['Turkey', '+90'], ['United States', '+1'], ['Canada', '+1'], ['Australia', '+61'], ['New Zealand', '+64'], ['South Africa', '+27'], ['Other', ''],
  ];

  function detectTZ() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || FIRM_TZ; } catch (e) { return FIRM_TZ; }
  }

  // Bookable consultation slots: Mon–Fri within office hours (8:30am–5:30pm Kuala Lumpur time).
  function slots(days = 10) {
    const out = [];
    const base = new Date();
    for (let d = 1; out.length < days * 7 && d < days * 2; d++) {
      const day = new Date(base); day.setUTCDate(base.getUTCDate() + d);
      const klDay = new Intl.DateTimeFormat('en-GB', { timeZone: FIRM_TZ, weekday: 'short' }).format(day);
      if (klDay === 'Sat' || klDay === 'Sun') continue;
      for (const h of [9, 10, 11, 12, 14, 15, 16]) {
        const t = new Date(day); t.setUTCHours(h - 8, 0, 0, 0); out.push(t.toISOString());
      }
    }
    return out;
  }

  function firmOpen() {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: FIRM_TZ, weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const wd = p.find((x) => x.type === 'weekday').value, h = +p.find((x) => x.type === 'hour').value + +(p.find((x) => x.type === 'minute') || { value: 0 }).value / 60;
    return wd !== 'Sat' && wd !== 'Sun' && h >= 8.5 && h < 17.5;
  }

  window.Store = Store;
  window.Fmt = Fmt;
  window.NZA = { TIMEZONES, COUNTRIES, detectTZ, slots, firmOpen };
})();
