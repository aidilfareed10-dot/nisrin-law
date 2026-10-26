/* Sample data for Nisrin Law. Used by the local demo mode, and by tools/make-seed-sql.js
   to generate the identical starting data for the Supabase database. */
(function (root) {
  const AREAS = [
    'Commercial & Tech Dispute Litigation',
    'Algorithmic & SaaS Liability',
    'Corporate Restructuring',
    'Intellectual Property Protection',
  ];

  const TEAM = [
    { name: 'Siti Nisrin binti Ahmad Mukhadzir', role: 'Managing Partner', cred: 'LL.B (Hons) (UiTM), Advocate & Solicitor (High Court of Malaya)' },
    { name: 'Nureen Najihah binti Yuhanas Zafarullah', role: 'Managing Partner', cred: 'LL.B (Hons) Liverpool, CLP' },
    { name: 'Ajlali Rasyidah binti Anuar', role: 'Senior Partner', cred: 'LL.B (Hons) UM, Advocate & Solicitor (High Court of Malaya)' },
    { name: 'Zahia Azzahraa binti Zulhazman', role: 'Senior Partner', cred: 'LL.B (Hons) (UiTM), Advocate & Solicitor (High Court of Malaya)' },
    { name: 'Anthony Lee', role: 'Junior Partner', cred: 'LL.B (Hons) UM, Advocate & Solicitor (High Court of Malaya)' },
    { name: 'Farah Fakhira binti Fakaruddin', role: 'Junior Partner', cred: 'LL.B (Hons) (UiTM), Advocate & Solicitor (High Court of Malaya)' },
    { name: 'Lee Cheng Xia', role: 'Legal Assistant', cred: 'Diploma in Law, IIC' },
    { name: 'Nadirah binti Azhar', role: 'Legal Assistant', cred: 'Diploma in Law, UNISZA' },
  ];

  // Sample sign-ins (also created in the Supabase setup script).
  const DEMO = {
    staff: { email: 'staff@nisrinlaw.com', password: 'NisrinStaff#2026' },
    client: { email: 'client@nisrinlaw.com', password: 'NisrinClient#2026' },
  };

  function seed(daysFromNow) {
    const D = daysFromNow;
    return {
      settings: {
        firmName: 'Nisrin Law',
        phone: '+603-2178 8888',
        fax: '+603-2178 8889',
        email: 'nisrinlaw@gmail.com',
        // Indicative MYR conversion rates — editable by staff.
        rates: { MYR: 1, USD: 0.236, SGD: 0.305, GBP: 0.178, EUR: 0.204, AUD: 0.358, AED: 0.867, SAR: 0.885, CNY: 1.69, JPY: 34.9, IDR: 3790 },
      },
      users: [
        { id: 'u_staff', role: 'admin', name: 'Siti Nisrin binti Ahmad Mukhadzir', title: 'Managing Partner', email: DEMO.staff.email, password: DEMO.staff.password, tz: 'Asia/Kuala_Lumpur', lang: 'en', currency: 'MYR' },
        { id: 'u_sarah', role: 'client', name: 'Sarah Thompson', email: DEMO.client.email, password: DEMO.client.password, company: 'Harbourline Capital Ltd', country: 'United Kingdom', phone: '+44 20 7946 0123', tz: 'Europe/London', lang: 'en', currency: 'GBP', joined: D(-60) },
        { id: 'u_wei', role: 'client', name: 'Lim Wei Jie', email: 'weijie@example.com', company: 'Straits Robotics Pte Ltd', country: 'Singapore', phone: '+65 6123 4567', tz: 'Asia/Singapore', lang: 'zh', currency: 'SGD', joined: D(-120), pending: true },
        { id: 'u_omar', role: 'client', name: 'Omar Al-Mansouri', email: 'omar@example.com', company: 'Gulf Horizon Holdings', country: 'United Arab Emirates', phone: '+971 4 123 4567', tz: 'Asia/Dubai', lang: 'ar', currency: 'AED', joined: D(-25), pending: true },
      ],
      matters: [
        {
          id: 'm1', ref: 'NL/CT/2026/0142', clientId: 'u_sarah', title: 'SaaS licence breach — Harbourline v. CloudLedger Sdn Bhd',
          area: AREAS[0], stage: 3, lawyer: 'Siti Nisrin binti Ahmad Mukhadzir', opened: D(-55), court: 'Kuala Lumpur Court Complex',
          nextEvent: { label: 'Case management (e-Review)', date: D(9, 9, 30) },
          updates: [
            { date: D(-55), text: 'Matter opened. Engagement letter and remote KYC completed.', by: 'Siti Nisrin binti Ahmad Mukhadzir' },
            { date: D(-41), text: 'Letter of demand issued to CloudLedger Sdn Bhd for service-level breaches and data loss.', by: 'Siti Nisrin binti Ahmad Mukhadzir' },
            { date: D(-20), text: 'Writ of summons and statement of claim filed via e-Filing.', by: 'Anthony Lee' },
            { date: D(-6), text: 'Defence received. We are preparing the reply and an assessment for summary judgment.', by: 'Siti Nisrin binti Ahmad Mukhadzir' },
            { date: D(-5), text: 'Expert IT witness shortlisted — awaiting fee quote before recommending to client.', by: 'Anthony Lee', internal: true },
          ],
        },
        {
          id: 'm2', ref: 'NL/IP/2026/0157', clientId: 'u_sarah', title: 'Trade mark filing & brand protection — Harbourline Malaysia',
          area: AREAS[3], stage: 2, lawyer: 'Farah Fakhira binti Fakaruddin', opened: D(-18), court: '—',
          nextEvent: { label: 'MyIPO examination response due', date: D(14) },
          updates: [
            { date: D(-18), text: 'Instructions received. Clearance search on the HARBOURLINE mark requested.', by: 'Farah Fakhira binti Fakaruddin' },
            { date: D(-7), text: 'Search clear in classes 36 and 42. Application filed with MyIPO.', by: 'Farah Fakhira binti Fakaruddin' },
          ],
        },
        {
          id: 'm3', ref: 'NL/AL/2026/0118', clientId: 'u_wei', title: 'Algorithmic pricing error — liability claim against platform vendor',
          area: AREAS[1], stage: 4, lawyer: 'Anthony Lee', opened: D(-110), court: 'AIAC arbitration',
          nextEvent: { label: 'Final award expected', date: D(5) },
          updates: [
            { date: D(-110), text: 'Notice of arbitration served on the vendor.', by: 'Anthony Lee' },
            { date: D(-70), text: 'Tribunal constituted under the AIAC Rules.', by: 'Anthony Lee' },
            { date: D(-30), text: 'Hearing concluded; closing submissions filed.', by: 'Anthony Lee' },
          ],
        },
        {
          id: 'm4', ref: 'NL/CR/2026/0163', clientId: 'u_omar', title: 'Group restructuring — Malaysian subsidiary',
          area: AREAS[2], stage: 1, lawyer: 'Ajlali Rasyidah binti Anuar', opened: D(-10), court: '—',
          nextEvent: { label: 'Draft restructuring plan for review', date: D(3) },
          updates: [{ date: D(-10), text: 'Engagement letter issued. Awaiting certified passport copies for KYC.', by: 'Ajlali Rasyidah binti Anuar' }],
        },
      ],
      documents: [
        { id: 'd1', matterId: 'm1', clientId: 'u_sarah', name: 'Engagement letter (signed).pdf', size: 184320, by: 'firm', date: D(-55), category: 'Engagement' },
        { id: 'd2', matterId: 'm1', clientId: 'u_sarah', name: 'Statement of claim — sealed.pdf', size: 612000, by: 'firm', date: D(-20), category: 'Court filing' },
        { id: 'd3', matterId: 'm1', clientId: 'u_sarah', name: 'SaaS master services agreement 2024.pdf', size: 1240000, by: 'client', date: D(-50), category: 'Evidence' },
        { id: 'd4', matterId: 'm2', clientId: 'u_sarah', name: 'Trade mark clearance search.pdf', size: 98000, by: 'firm', date: D(-7), category: 'Search report' },
        { id: 'd5', matterId: 'm3', clientId: 'u_wei', name: 'Closing submissions.pdf', size: 870000, by: 'firm', date: D(-30), category: 'Arbitration' },
      ],
      messages: [
        { id: 'msg1', clientId: 'u_sarah', matterId: 'm1', from: 'firm', author: 'Siti Nisrin binti Ahmad Mukhadzir', text: 'Dear Sarah, the defence has been filed. I have uploaded a note on our next steps — happy to walk you through it on a call at a time that suits London.', date: D(-6), read: false },
        { id: 'msg2', clientId: 'u_sarah', matterId: 'm1', from: 'client', author: 'Sarah Thompson', text: 'Thank you. Could we speak next Tuesday afternoon UK time?', date: D(-5), read: true },
        { id: 'msg3', clientId: 'u_wei', matterId: 'm3', from: 'firm', author: 'Anthony Lee', text: 'The tribunal has confirmed the award timeline. We will update you as soon as it is delivered.', date: D(-3), read: false },
      ],
      invoices: [
        { id: 'i1', number: 'NL-INV-2026-0311', clientId: 'u_sarah', matterId: 'm1', amount: 18500, status: 'paid', issued: D(-50), due: D(-36), items: 'Professional fees — pre-action & filing' },
        { id: 'i2', number: 'NL-INV-2026-0388', clientId: 'u_sarah', matterId: 'm1', amount: 9200, status: 'unpaid', issued: D(-4), due: D(10), items: 'Professional fees — defence review; disbursements' },
        { id: 'i3', number: 'NL-INV-2026-0354', clientId: 'u_wei', matterId: 'm3', amount: 26000, status: 'unpaid', issued: D(-20), due: D(-6), items: 'Arbitration — professional fees' },
      ],
      appointments: [
        { id: 'a1', clientId: 'u_sarah', when: D(4, 16, 0), mode: 'Video (Zoom / Google Meet)', lawyer: 'Siti Nisrin binti Ahmad Mukhadzir', topic: 'Reply to defence — strategy call', status: 'confirmed' },
        { id: 'a2', clientId: 'u_omar', when: D(2, 14, 0), mode: 'Video (Zoom / Google Meet)', lawyer: 'Ajlali Rasyidah binti Anuar', topic: 'Restructuring kick-off', status: 'requested' },
      ],
      enquiries: [
        { id: 'e1', name: 'Hiroshi Tanaka', email: 'h.tanaka@example.jp', phone: '+81 3 1234 5678', country: 'Japan', area: AREAS[3], mode: 'Video (Zoom / Google Meet)', tz: 'Asia/Tokyo', slot: D(3, 10, 0), message: 'We are a Japanese software company entering Malaysia and need advice on protecting our trade marks and source code.', urgent: false, date: D(-1), status: 'new' },
        { id: 'e2', name: 'Priya Raman', email: 'priya.r@example.com', phone: '+61 2 9876 5432', country: 'Australia', area: AREAS[1], mode: 'Telephone', tz: 'Australia/Sydney', slot: D(2, 11, 0), message: 'A Malaysian SaaS provider’s automated billing engine overcharged our customers. We need advice on liability and recovery.', urgent: true, date: D(0), status: 'new' },
      ],
    };
  }

  root.NL_SEED = { AREAS, TEAM, DEMO, seed };
})(typeof window !== 'undefined' ? window : globalThis);
