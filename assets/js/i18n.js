/* Interface translations. Body copy is English; navigation, headings, actions and forms
   switch language. Have the Chinese and Arabic strings checked by a native speaker before launch. */
(function () {
  const T = {
    en: {
      'top.firm': 'Office time', 'top.you': 'Your time', 'top.open': 'Open now', 'top.closed': 'Closed — leave a message',
      'nav.firm': 'The Firm', 'nav.practice': 'Practice', 'nav.intl': 'International', 'nav.people': 'Our People', 'nav.faq': 'FAQ', 'nav.contact': 'Contact',
      'nav.signin': 'Client portal', 'nav.book': 'Book consultation',
      'hero.eyebrow': 'Advocates & Solicitors · Kuala Lumpur, Malaysia',
      'hero.t1': 'Law for the', 'hero.t2': 'digital economy.',
      'hero.sub': 'Disputes, liability and protection for technology-driven business.',
      'hero.body': 'Commercial & tech dispute litigation, algorithmic & SaaS liability, corporate restructuring and intellectual property protection — for clients in Malaysia and around the world.',
      'hero.cta1': 'Book a consultation', 'hero.cta2': 'Our practice areas',
      'stat.years': 'Core practice areas', 'stat.cases': 'Partners', 'stat.value': 'Legal professionals', 'stat.countries': 'Billing currencies',
      'firm.eyebrow': 'The Firm', 'firm.t1': 'Precise counsel.', 'firm.t2': 'Modern disputes.',
      'practice.eyebrow': 'Areas of expertise', 'practice.t1': 'Four practices.', 'practice.t2': 'One focus.', 'practice.cta': 'Discuss your matter',
      'intl.eyebrow': 'International clients', 'intl.t1': 'Wherever you are,', 'intl.t2': 'your matter is here.',
      'intl.how': 'How remote engagement works', 'intl.clock': 'Plan a call across time zones', 'intl.yourcity': 'Your time zone', 'intl.chambers': 'Our office (Kuala Lumpur)',
      'people.eyebrow': 'Our people', 'people.t1': 'Counsel you can', 'people.t2': 'confide in.',
      'test.eyebrow': 'Client testimonials', 'test.t1': 'In our clients’', 'test.t2': 'own words.',
      'faq.eyebrow': 'Common questions', 'faq.t1': 'Answers', 'faq.t2': 'before you ask.',
      'contact.eyebrow': 'Consultation', 'contact.t1': 'Good counsel starts', 'contact.t2': 'with a conversation.',
      'contact.body': 'Share the broad facts of your situation. A partner will reply within one business day — in your time zone.',
      'f.name': 'Full name', 'f.email': 'Email address', 'f.country': 'Country of residence', 'f.phone': 'Phone / WhatsApp', 'f.area': 'Practice area',
      'f.mode': 'Consultation mode', 'f.tz': 'Your time zone', 'f.slot': 'Preferred slot (shown in your time)', 'f.msg': 'Summary of your matter',
      'f.urgent': 'This is urgent — assets or evidence may be at risk', 'f.consent': 'I consent to Nisrin Law processing my personal data for this enquiry under the Personal Data Protection Act 2010.',
      'f.submit': 'Submit enquiry', 'f.choose': 'Select…', 'f.privileged': 'Protected by legal professional privilege. Strictly confidential.',
      'f.thanks': 'Thank you. Your enquiry is with our partners — expect a reply within one business day.',
      'p.overview': 'Overview', 'p.matters': 'My matters', 'p.documents': 'Documents', 'p.messages': 'Messages', 'p.appointments': 'Appointments',
      'p.invoices': 'Invoices', 'p.profile': 'Profile & preferences', 'p.signout': 'Sign out', 'p.welcome': 'Welcome back',
      'login.title': 'Welcome back', 'login.sub': 'Sign in to view your matters, documents and updates.', 'login.btn': 'Sign in', 'login.new': 'New client? Create an account',
    },
    ms: {
      'top.firm': 'Waktu pejabat', 'top.you': 'Waktu anda', 'top.open': 'Dibuka sekarang', 'top.closed': 'Ditutup — tinggalkan mesej',
      'nav.firm': 'Firma', 'nav.practice': 'Amalan', 'nav.intl': 'Antarabangsa', 'nav.people': 'Peguam Kami', 'nav.faq': 'Soalan Lazim', 'nav.contact': 'Hubungi',
      'nav.signin': 'Portal klien', 'nav.book': 'Tempah konsultasi',
      'hero.eyebrow': 'Peguambela & Peguamcara · Kuala Lumpur, Malaysia',
      'hero.t1': 'Undang-undang untuk', 'hero.t2': 'ekonomi digital.',
      'hero.sub': 'Pertikaian, liabiliti dan perlindungan untuk perniagaan berasaskan teknologi.',
      'hero.body': 'Litigasi pertikaian komersial & teknologi, liabiliti algoritma & SaaS, penstrukturan semula korporat dan perlindungan harta intelek — untuk klien di Malaysia dan seluruh dunia.',
      'hero.cta1': 'Tempah konsultasi', 'hero.cta2': 'Bidang amalan kami',
      'stat.years': 'Bidang amalan utama', 'stat.cases': 'Rakan kongsi', 'stat.value': 'Profesional undang-undang', 'stat.countries': 'Mata wang bil',
      'firm.eyebrow': 'Firma', 'firm.t1': 'Nasihat yang tepat.', 'firm.t2': 'Pertikaian moden.',
      'practice.eyebrow': 'Bidang kepakaran', 'practice.t1': 'Empat amalan.', 'practice.t2': 'Satu tumpuan.', 'practice.cta': 'Bincang perkara anda',
      'intl.eyebrow': 'Klien antarabangsa', 'intl.t1': 'Di mana jua anda berada,', 'intl.t2': 'perkara anda di sini.',
      'intl.how': 'Cara penglibatan jarak jauh', 'intl.clock': 'Rancang panggilan merentas zon waktu', 'intl.yourcity': 'Zon waktu anda', 'intl.chambers': 'Pejabat kami (Kuala Lumpur)',
      'people.eyebrow': 'Peguam kami', 'people.t1': 'Peguam yang boleh', 'people.t2': 'anda percayai.',
      'test.eyebrow': 'Testimoni klien', 'test.t1': 'Kata-kata', 'test.t2': 'klien kami.',
      'faq.eyebrow': 'Soalan lazim', 'faq.t1': 'Jawapan', 'faq.t2': 'sebelum anda bertanya.',
      'contact.eyebrow': 'Konsultasi', 'contact.t1': 'Nasihat yang baik bermula', 'contact.t2': 'dengan perbualan.',
      'contact.body': 'Kongsikan fakta ringkas situasi anda. Rakan kongsi kami akan membalas dalam satu hari bekerja — mengikut zon waktu anda.',
      'f.name': 'Nama penuh', 'f.email': 'Alamat e-mel', 'f.country': 'Negara kediaman', 'f.phone': 'Telefon / WhatsApp', 'f.area': 'Bidang amalan',
      'f.mode': 'Mod konsultasi', 'f.tz': 'Zon waktu anda', 'f.slot': 'Slot pilihan (waktu anda)', 'f.msg': 'Ringkasan perkara anda',
      'f.urgent': 'Ini mendesak — aset atau bukti mungkin berisiko', 'f.consent': 'Saya bersetuju data peribadi saya diproses oleh Nisrin Law bagi pertanyaan ini di bawah Akta Perlindungan Data Peribadi 2010.',
      'f.submit': 'Hantar pertanyaan', 'f.choose': 'Pilih…', 'f.privileged': 'Dilindungi keistimewaan profesional guaman. Sulit.',
      'f.thanks': 'Terima kasih. Pertanyaan anda telah diterima — balasan dalam satu hari bekerja.',
      'p.overview': 'Ringkasan', 'p.matters': 'Perkara saya', 'p.documents': 'Dokumen', 'p.messages': 'Mesej', 'p.appointments': 'Temu janji',
      'p.invoices': 'Invois', 'p.profile': 'Profil & tetapan', 'p.signout': 'Log keluar', 'p.welcome': 'Selamat kembali',
      'login.title': 'Selamat kembali', 'login.sub': 'Log masuk untuk melihat perkara, dokumen dan kemas kini anda.', 'login.btn': 'Log masuk', 'login.new': 'Klien baharu? Daftar akaun',
    },
    zh: {
      'top.firm': '办公时间', 'top.you': '您的时间', 'top.open': '现在营业', 'top.closed': '已下班 — 请留言',
      'nav.firm': '律所简介', 'nav.practice': '业务领域', 'nav.intl': '国际客户', 'nav.people': '律师团队', 'nav.faq': '常见问题', 'nav.contact': '联系我们',
      'nav.signin': '客户门户', 'nav.book': '预约咨询',
      'hero.eyebrow': '出庭律师及事务律师 · 马来西亚吉隆坡',
      'hero.t1': '服务', 'hero.t2': '数字经济的法律。',
      'hero.sub': '为科技驱动型企业处理争议、责任与保护。',
      'hero.body': '商业与科技争议诉讼、算法与 SaaS 责任、企业重组及知识产权保护 — 服务马来西亚及世界各地的客户。',
      'hero.cta1': '预约咨询', 'hero.cta2': '我们的业务领域',
      'stat.years': '核心业务领域', 'stat.cases': '合伙人', 'stat.value': '法律专业人员', 'stat.countries': '结算货币',
      'firm.eyebrow': '律所简介', 'firm.t1': '精准的法律意见。', 'firm.t2': '现代的争议解决。',
      'practice.eyebrow': '专业领域', 'practice.t1': '四大业务。', 'practice.t2': '一个焦点。', 'practice.cta': '咨询您的案件',
      'intl.eyebrow': '国际客户', 'intl.t1': '无论您身在何处，', 'intl.t2': '您的案件都由我们守护。',
      'intl.how': '远程委托流程', 'intl.clock': '跨时区安排通话', 'intl.yourcity': '您的时区', 'intl.chambers': '我们的办公室（吉隆坡）',
      'people.eyebrow': '律师团队', 'people.t1': '值得您', 'people.t2': '信赖的律师。',
      'test.eyebrow': '客户评价', 'test.t1': '听听', 'test.t2': '客户怎么说。',
      'faq.eyebrow': '常见问题', 'faq.t1': '您关心的', 'faq.t2': '问题解答。',
      'contact.eyebrow': '咨询', 'contact.t1': '优质的法律服务', 'contact.t2': '始于一次对话。',
      'contact.body': '请简要说明您的情况。合伙人将在一个工作日内按您的时区回复。',
      'f.name': '姓名', 'f.email': '电子邮箱', 'f.country': '居住国家', 'f.phone': '电话 / WhatsApp', 'f.area': '业务领域',
      'f.mode': '咨询方式', 'f.tz': '您的时区', 'f.slot': '首选时段（按您的时间显示）', 'f.msg': '案情摘要',
      'f.urgent': '紧急 — 资产或证据可能面临风险', 'f.consent': '本人同意 Nisrin Law 根据《2010年个人资料保护法》为本次咨询处理本人的个人资料。',
      'f.submit': '提交咨询', 'f.choose': '请选择…', 'f.privileged': '受律师职业特权保护，严格保密。',
      'f.thanks': '谢谢。您的咨询已提交，我们将在一个工作日内回复。',
      'p.overview': '概览', 'p.matters': '我的案件', 'p.documents': '文件', 'p.messages': '消息', 'p.appointments': '预约',
      'p.invoices': '账单', 'p.profile': '个人资料与偏好', 'p.signout': '退出', 'p.welcome': '欢迎回来',
      'login.title': '欢迎回来', 'login.sub': '登录以查看您的案件、文件和最新进展。', 'login.btn': '登录', 'login.new': '新客户？创建账户',
    },
    ar: {
      'top.firm': 'توقيت المكتب', 'top.you': 'توقيتك', 'top.open': 'مفتوح الآن', 'top.closed': 'مغلق — اترك رسالة',
      'nav.firm': 'المكتب', 'nav.practice': 'مجالات العمل', 'nav.intl': 'العملاء الدوليون', 'nav.people': 'فريقنا', 'nav.faq': 'الأسئلة الشائعة', 'nav.contact': 'اتصل بنا',
      'nav.signin': 'بوابة العملاء', 'nav.book': 'احجز استشارة',
      'hero.eyebrow': 'محامون ومستشارون قانونيون · كوالالمبور، ماليزيا',
      'hero.t1': 'قانون', 'hero.t2': 'للاقتصاد الرقمي.',
      'hero.sub': 'النزاعات والمسؤولية والحماية للأعمال القائمة على التكنولوجيا.',
      'hero.body': 'التقاضي في النزاعات التجارية والتقنية، ومسؤولية الخوارزميات وخدمات SaaS، وإعادة هيكلة الشركات، وحماية الملكية الفكرية — لعملائنا في ماليزيا وحول العالم.',
      'hero.cta1': 'احجز استشارة', 'hero.cta2': 'مجالات عملنا',
      'stat.years': 'مجالات العمل الرئيسية', 'stat.cases': 'الشركاء', 'stat.value': 'المهنيون القانونيون', 'stat.countries': 'عملات الفوترة',
      'firm.eyebrow': 'المكتب', 'firm.t1': 'استشارة دقيقة.', 'firm.t2': 'نزاعات حديثة.',
      'practice.eyebrow': 'مجالات الخبرة', 'practice.t1': 'أربعة مجالات.', 'practice.t2': 'تركيز واحد.', 'practice.cta': 'ناقش قضيتك',
      'intl.eyebrow': 'العملاء الدوليون', 'intl.t1': 'أينما كنت،', 'intl.t2': 'قضيتك هنا.',
      'intl.how': 'كيف يتم التعامل عن بُعد', 'intl.clock': 'خطط لمكالمة عبر المناطق الزمنية', 'intl.yourcity': 'منطقتك الزمنية', 'intl.chambers': 'مكتبنا (كوالالمبور)',
      'people.eyebrow': 'فريقنا', 'people.t1': 'محامون', 'people.t2': 'تثق بهم.',
      'test.eyebrow': 'آراء العملاء', 'test.t1': 'بكلمات', 'test.t2': 'عملائنا.',
      'faq.eyebrow': 'أسئلة شائعة', 'faq.t1': 'إجابات', 'faq.t2': 'قبل أن تسأل.',
      'contact.eyebrow': 'استشارة', 'contact.t1': 'الاستشارة الجيدة تبدأ', 'contact.t2': 'بمحادثة.',
      'contact.body': 'شاركنا الوقائع الأساسية لحالتك. سيرد أحد الشركاء خلال يوم عمل واحد — وفق منطقتك الزمنية.',
      'f.name': 'الاسم الكامل', 'f.email': 'البريد الإلكتروني', 'f.country': 'بلد الإقامة', 'f.phone': 'الهاتف / واتساب', 'f.area': 'مجال العمل',
      'f.mode': 'طريقة الاستشارة', 'f.tz': 'منطقتك الزمنية', 'f.slot': 'الموعد المفضل (بتوقيتك)', 'f.msg': 'ملخص قضيتك',
      'f.urgent': 'عاجل — قد تكون الأصول أو الأدلة معرضة للخطر', 'f.consent': 'أوافق على معالجة بياناتي الشخصية من قبل Nisrin Law لهذا الاستفسار وفقًا لقانون حماية البيانات الشخصية لعام 2010.',
      'f.submit': 'إرسال الاستفسار', 'f.choose': 'اختر…', 'f.privileged': 'محمي بالسرية المهنية للمحامي. سري للغاية.',
      'f.thanks': 'شكرًا لك. تم استلام استفسارك وسنرد خلال يوم عمل واحد.',
      'p.overview': 'نظرة عامة', 'p.matters': 'قضاياي', 'p.documents': 'المستندات', 'p.messages': 'الرسائل', 'p.appointments': 'المواعيد',
      'p.invoices': 'الفواتير', 'p.profile': 'الملف الشخصي والتفضيلات', 'p.signout': 'تسجيل الخروج', 'p.welcome': 'مرحبًا بعودتك',
      'login.title': 'مرحبًا بعودتك', 'login.sub': 'سجّل الدخول لعرض قضاياك ومستنداتك وآخر المستجدات.', 'login.btn': 'تسجيل الدخول', 'login.new': 'عميل جديد؟ أنشئ حسابًا',
    },
  };

  const LANGS = [['en', 'English'], ['ms', 'Bahasa Melayu'], ['zh', '中文'], ['ar', 'العربية']];

  function getLang() {
    try { return localStorage.getItem('nisrin_lang') || 'en'; } catch (e) { return 'en'; }
  }
  function t(key) { const l = getLang(); return (T[l] && T[l][key]) || T.en[key] || key; }
  function apply(root) {
    const l = getLang();
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    (root || document).querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('select[data-lang-switch]').forEach((s) => { s.value = l; });
  }
  function setLang(l) {
    try { localStorage.setItem('nisrin_lang', l); } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }
  function bindSwitchers() {
    document.querySelectorAll('select[data-lang-switch]').forEach((s) => {
      if (s.dataset.bound) return;
      s.dataset.bound = '1';
      if (!s.options.length) LANGS.forEach(([v, n]) => s.add(new Option(n, v)));
      s.addEventListener('change', () => setLang(s.value));
    });
  }

  window.I18N = { t, apply, setLang, getLang, LANGS, bindSwitchers };
  document.addEventListener('DOMContentLoaded', () => { bindSwitchers(); apply(); });
})();
