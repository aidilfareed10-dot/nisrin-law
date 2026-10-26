(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const { TIMEZONES, COUNTRIES, detectTZ, slots, firmOpen } = window.NZA;
  const FIRM_TZ = Store.FIRM_TZ;
  const t = I18N.t;

  const ICONS = {
    globe: '<path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/><circle cx="12" cy="12" r="9"/>',
    scale: '<path d="M12 3v18M5 21h14M4 7h16M7 7l-3 7a3 3 0 0 0 6 0L7 7zm10 0l-3 7a3 3 0 0 0 6 0l-3-7z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    currency: '<circle cx="9" cy="9" r="6"/><path d="M15.5 9.5A6 6 0 1 1 9.5 15.5"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  };
  $$('[data-icon]').forEach((el) => {
    el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[el.dataset.icon] || ''}</svg>`;
  });

  // ---------- practice areas ----------
  const PRACTICE = [
    ['Commercial & Tech Dispute Litigation', 'Litigation and arbitration for disputes where technology sits at the centre of the commercial bargain — failed implementations, platform outages, data loss and broken service levels.', ['Software, SaaS & IT outsourcing disputes', 'Breach of service-level and licence agreements', 'Urgent injunctions to preserve data and systems', 'Expert-evidence strategy for technical disputes']],
    ['Algorithmic & SaaS Liability', 'Advice and representation when automated systems cause loss — from pricing and trading algorithms to AI-driven decisions and subscription platforms that fail their users.', ['Liability for algorithmic and AI-driven errors', 'Allocation of risk in SaaS terms and indemnities', 'Regulatory exposure and customer claims', 'Incident response and pre-action strategy']],
    ['Corporate Restructuring', 'Guiding companies, directors and investors through reorganisation — whether to grow, consolidate, rescue or exit — while protecting value and managing stakeholder risk.', ['Group reorganisations & subsidiary set-up', 'Schemes of arrangement & corporate rescue', 'Shareholder and director disputes', 'Distressed M&A and exits']],
    ['Intellectual Property Protection', 'Securing and enforcing the intangible assets that drive technology businesses — brands, software, content and confidential know-how.', ['Trade mark registration & enforcement', 'Copyright in software and source code', 'Confidential information & trade secrets', 'IP licensing, assignments and due diligence']],
  ];
  const list = $('#practiceList');
  list.innerHTML = `<div class="p-list" role="tablist">${PRACTICE.map((p, i) => `<button class="p-item${i ? '' : ' active'}" role="tab" aria-selected="${!i}" data-i="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${p[0]}</button>`).join('')}</div><div class="p-detail" id="pDetail" role="tabpanel"></div>`;
  function showPractice(i) {
    const [name, desc, items] = PRACTICE[i];
    const d = $('#pDetail');
    d.classList.remove('fade'); void d.offsetWidth; d.classList.add('fade');
    d.innerHTML = `<div class="num">${String(i + 1).padStart(2, '0')}</div><h3>${name}</h3><p>${desc}</p><ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul>
      <a href="#contact" class="btn btn-navy" data-area="${name}"><span>${t('practice.cta')}</span><span class="arrow"></span></a>`;
    $$('.p-item').forEach((b) => { const on = +b.dataset.i === i; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
  }
  list.addEventListener('click', (e) => { const b = e.target.closest('.p-item'); if (b) showPractice(+b.dataset.i); });
  document.addEventListener('click', (e) => { const a = e.target.closest('[data-area]'); if (a) $('#fArea').value = a.dataset.area; });
  showPractice(0);

  // ---------- team ----------
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const initials = (n) => n.split(' ').filter((w) => !/^(bin|binti|bt|b\.)$/i.test(w)).slice(0, 2).map((w) => w[0]).join('');
  const GROUPS = [
    ['Managing Partners', 'Managing Partner'],
    ['Senior Partners', 'Senior Partner'],
    ['Junior Partners', 'Junior Partner'],
    ['Legal Assistants', 'Legal Assistant'],
  ];
  $('#team').innerHTML = GROUPS.map(([label, role]) => {
    const people = window.NL_SEED.TEAM.filter((p) => p.role === role);
    const lead = role !== 'Legal Assistant';
    return `<div class="team-group">
      <div class="group-label"><span>${label}</span><strong>${String(people.length).padStart(2, '0')}</strong></div>
      <div class="${lead ? 'people-grid' : 'associates'}">${people.map((p) => `
        <article class="${lead ? 'person' : 'assoc'}">
          <div class="monogram">${initials(p.name)}</div>
          <div><p class="role">${esc(p.role)}</p><h4>${esc(p.name)}</h4><p>${esc(p.cred)}</p></div>
        </article>`).join('')}</div>
    </div>`;
  }).join('');

  // ---------- FAQ ----------
  const FAQ = [
    ['', 'What kinds of matters do you handle?', 'We focus on four areas: commercial and technology disputes, liability arising from algorithms and SaaS platforms, corporate restructuring, and intellectual property protection. If your matter sits outside these, we will tell you honestly at the first conversation.'],
    ['Technology', 'Our software vendor failed to deliver. Do we have a claim?', 'Often, yes — but it depends on what the contract promised, what was actually delivered and what loss followed. We review the agreement, specifications, service levels and correspondence, and tell you early whether litigation, arbitration or negotiation is the best route.'],
    ['Technology', 'Who is liable when an algorithm or AI system makes a costly mistake?', 'Liability usually turns on the contract terms, the warranties given, how the system was configured and who controlled it. We analyse the technical facts with you and identify which party bears the risk — and how to recover the loss.'],
    ['International', 'I am based outside Malaysia. Can you act for me?', 'Yes. Consultations, engagement, identity verification, document exchange and updates are all handled remotely through video calls and our secure client portal.'],
    ['International', 'Can I pay in my own currency?', 'Fees are quoted in Malaysian Ringgit, and your portal shows every estimate and invoice converted into your preferred currency for reference. Payment is accepted by international bank transfer.'],
    ['', 'How are your legal fees structured?', 'Depending on the matter we work on fixed fees, staged fees or time-based billing. You receive a written estimate before any work begins.'],
    ['', 'When is the office open?', 'Monday to Friday, 8:30 AM to 5:30 PM (Malaysia time). We are closed on Saturdays, Sundays and public holidays. Enquiries sent outside these hours are answered the next business day.'],
    ['', 'Is my information kept confidential?', 'Yes. Communications with us are protected by legal professional privilege, and personal data is handled in line with the Personal Data Protection Act 2010.'],
  ];
  $('#faqList').innerHTML = FAQ.map(([tag, q, a], i) => `<details${i ? '' : ' open'}><summary>${tag ? `<span class="tag">${tag}</span>` : ''}${q}</summary><p>${a}</p></details>`).join('');

  // ---------- clocks ----------
  const userTZ = detectTZ();
  const fmtT = (tz) => new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(new Date());
  function tickTop() {
    $('#clockFirm').textContent = fmtT(FIRM_TZ);
    $('#clockYou').textContent = fmtT(userTZ);
    const open = firmOpen();
    $('#openDot').classList.toggle('off', !open);
    $('#openLabel').textContent = t(open ? 'top.open' : 'top.closed');
  }

  // ---------- time zone planner ----------
  const tzPick = $('#tzPick');
  const tzList = TIMEZONES.includes(userTZ) ? TIMEZONES : [userTZ, ...TIMEZONES];
  tzList.forEach((z) => tzPick.add(new Option(Fmt.tzLabel(z), z)));
  tzPick.value = userTZ;

  function offsetMinutes(tz, d = new Date()) {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(d).map((x) => [x.type, x.value]));
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
    return Math.round((asUTC - d.getTime()) / 60000);
  }
  function renderTZ() {
    const tz = tzPick.value, now = new Date();
    const dOpts = { weekday: 'short', day: 'numeric', month: 'short' };
    $('#tzFirm').textContent = fmtT(FIRM_TZ);
    $('#tzFirmDate').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: FIRM_TZ, ...dOpts }).format(now);
    $('#tzYou').textContent = fmtT(tz);
    $('#tzYouDate').textContent = new Intl.DateTimeFormat('en-GB', { timeZone: tz, ...dOpts }).format(now);
    $('#tzYouLabel').textContent = tz.split('/').pop().replace(/_/g, ' ');
    // office 08:30–17:30 KL expressed in the selected zone's 24h day
    const diff = (offsetMinutes(tz) - offsetMinutes(FIRM_TZ)) / 60; // hours ahead of KL
    const start = ((8.5 + diff) % 24 + 24) % 24, end = start + 9;
    const seg = (a, b) => `<div class="open" style="left:${(a / 24) * 100}%;width:${((b - a) / 24) * 100}%"></div>`;
    let bars = end <= 24 ? seg(start, end) : seg(start, 24) + seg(0, end - 24);
    const p = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now);
    const h = +p.find((x) => x.type === 'hour').value + +p.find((x) => x.type === 'minute').value / 60;
    $('#tzBar').innerHTML = bars + `<div class="now" style="left:${(h / 24) * 100}%"></div><div class="ticks"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div>`;
    const hh = (x) => { const m = Math.round((x % 24) * 60); return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
    const diffTxt = diff === 0 ? 'the same time as' : `${Math.abs(diff)} hour${Math.abs(diff) === 1 ? '' : 's'} ${diff > 0 ? 'ahead of' : 'behind'}`;
    $('#tzNote').innerHTML = `You are ${diffTxt} Kuala Lumpur. Our office hours are <strong>${hh(start)} – ${hh(end)}</strong> your time (Mon–Fri). ${firmOpen() ? 'We are <strong>open now</strong>.' : 'We are currently closed — book a slot below and we will confirm by email.'}`;
  }
  tzPick.addEventListener('change', () => { renderTZ(); fTz.value = tzPick.value; renderSlots(); });

  // ---------- enquiry form ----------
  const fCountry = $('#fCountry'), fDial = $('#fDial'), fTz = $('#fTz'), fSlot = $('#fSlot'), fArea = $('#fArea');
  function fillSelects() {
    fArea.innerHTML = ''; fArea.add(new Option(t('f.choose'), ''));
    Store.AREAS.forEach((a) => fArea.add(new Option(a, a)));
    fArea.add(new Option('Other / general consultation', 'Other'));
  }
  COUNTRIES.forEach(([c, d]) => fCountry.add(new Option(c, c)));
  const guess = { 'Asia/Singapore': 'Singapore', 'Europe/London': 'United Kingdom', 'Asia/Dubai': 'United Arab Emirates', 'Asia/Tokyo': 'Japan', 'Australia/Sydney': 'Australia', 'America/New_York': 'United States', 'Asia/Jakarta': 'Indonesia', 'Asia/Shanghai': 'China', 'Asia/Hong_Kong': 'Hong Kong', 'Asia/Riyadh': 'Saudi Arabia', 'Asia/Kolkata': 'India' }[userTZ];
  fCountry.value = guess || 'Malaysia';
  const syncDial = () => { fDial.textContent = (COUNTRIES.find((c) => c[0] === fCountry.value) || [])[1] || '+'; };
  fCountry.addEventListener('change', syncDial); syncDial();
  tzList.forEach((z) => fTz.add(new Option(Fmt.tzLabel(z), z)));
  fTz.value = userTZ;
  function renderSlots() {
    const tz = fTz.value, prev = fSlot.value;
    fSlot.innerHTML = '';
    fSlot.add(new Option('Flexible — please propose a time', ''));
    slots(8).forEach((iso) => fSlot.add(new Option(`${Fmt.dateTime(iso, tz)}  ·  ${Fmt.time(iso, FIRM_TZ)} in Kuala Lumpur`, iso)));
    fSlot.value = prev;
  }
  fTz.addEventListener('change', renderSlots);
  fillSelects(); renderSlots();

  const form = $('#enquiryForm');
  let sending = false;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(form), err = $('#formError');
    if (fd.get('website')) return; // bot
    const missing = ['name', 'email', 'phone', 'area', 'message'].filter((k) => !String(fd.get(k) || '').trim());
    if (missing.length) { err.textContent = 'Please complete all required fields.'; form.querySelector(`[name=${missing[0]}]`).focus(); return; }
    if (!/^\S+@\S+\.\S+$/.test(fd.get('email'))) { err.textContent = 'Please enter a valid email address.'; return; }
    if (!fd.get('consent')) { err.textContent = 'Please confirm your consent under the PDPA to proceed.'; return; }
    err.textContent = '';
    const btn = form.querySelector('button[type=submit]'), label = btn.innerHTML;
    sending = true; btn.disabled = true; btn.textContent = 'Sending…';
    let res;
    try {
      res = await Store.submitEnquiry({
      name: fd.get('name').trim(), email: fd.get('email').trim(), phone: `${fDial.textContent} ${fd.get('phone').trim()}`, country: fd.get('country'),
      area: fd.get('area'), mode: fd.get('mode'), tz: fd.get('tz'), slot: fd.get('slot') || null, message: fd.get('message').trim(),
      urgent: !!fd.get('urgent'), date: new Date().toISOString(), status: 'new', lang: I18N.getLang(),
      });
    } catch (ex) { res = { error: 'network' }; }
    sending = false; btn.disabled = false; btn.innerHTML = label;
    if (res.error) {
      err.innerHTML = `Sorry — your enquiry could not be sent. Please try again, or email <a href="mailto:nisrinlaw@gmail.com">nisrinlaw@gmail.com</a> / call +603-2178 8888.`;
      console.error('Enquiry failed:', res.error);
      return;
    }
    const slot = fd.get('slot');
    form.innerHTML = `<div class="form-success"><span class="check-ic">✓</span><h3>Enquiry received</h3><p>${t('f.thanks')}</p>${slot ? `<p class="muted">Requested: <strong>${Fmt.dateTime(slot, fd.get('tz'))}</strong> your time.</p>` : ''}<p class="muted">Want to track it? <a href="register.html?email=${encodeURIComponent(fd.get('email'))}">Create a client portal account</a>.</p></div>`;
  });

  // ---------- header, menu, reveal, counters ----------
  const header = $('#header');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 10), { passive: true });
  const menuBtn = $('#menuBtn'), nav = $('#nav');
  menuBtn.addEventListener('click', () => { const o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });

  $$('.section-head, .split > *, .intl-card, .person, .assoc, .steps li, .tz-widget, .contact-form').forEach((el) => el.classList.add('reveal'));
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.12 }) : null;
  $$('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));

  const cio = 'IntersectionObserver' in window ? new IntersectionObserver((ents) => ents.forEach((en) => {
    if (!en.isIntersecting) return; cio.unobserve(en.target);
    const el = en.target, end = +el.dataset.count, t0 = performance.now();
    const step = (now) => { const k = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), { threshold: 0.5 }) : null;
  $$('[data-count]').forEach((el) => (cio ? cio.observe(el) : (el.textContent = el.dataset.count)));

  $('#year').textContent = new Date().getFullYear();
  document.addEventListener('langchange', () => { tickTop(); fillSelects(); showPractice(+($('.p-item.active') || { dataset: { i: 0 } }).dataset.i); });
  tickTop(); renderTZ();
  setInterval(() => { tickTop(); renderTZ(); }, 30000);
})();
