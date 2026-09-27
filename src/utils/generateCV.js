const labels = {
  en: {
    summary: 'PROFESSIONAL SUMMARY', experience: 'WORK EXPERIENCE',
    education: 'EDUCATION', skills: 'SKILLS', projects: 'PROJECTS', languages: 'LANGUAGES',
  },
  ar: {
    summary: 'الملخص المهني', experience: 'الخبرات العملية',
    education: 'التعليم', skills: 'المهارات', projects: 'المشاريع', languages: 'اللغات',
  },
};

function buildHTML(data, lang) {
  const isAr = lang === 'ar';
  const lbl = labels[lang];
  const dir = isAr ? 'rtl' : 'ltr';
  const fontFamily = isAr ? "'Cairo', sans-serif" : "'Helvetica Neue', Arial, sans-serif";
  const googleFont = isAr
    ? '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">'
    : '';

  const section = (title, content) => `
    <div class="section">
      <div class="section-title">${title}</div>
      ${content}
    </div>`;

  const row = (bold, sub) => `
    <div class="row">
      <div class="row-bold">${bold || ''}</div>
      ${sub ? `<div class="row-sub">${sub}</div>` : ''}
    </div>`;

  const para = (text) =>
    `<div class="para">${(text || '').replace(/\n/g, '<br/>')}</div>`;

  const contactParts = [
    data.email, data.phone, data.location,
    data.github ? `GitHub: ${data.github}` : '',
    data.linkedin ? `LinkedIn: ${data.linkedin}` : '',
  ].filter(Boolean).join(' | ');

  let body = '';

  if (data.summary)
    body += section(lbl.summary, para(data.summary));

  if (data.experience?.some((e) => e.role || e.company)) {
    const items = data.experience
      .filter((e) => e.role || e.company)
      .map((e) =>
        row(e.role, `${e.company || ''}${e.period ? ' | ' + e.period : ''}`) +
        (e.description ? para(e.description) : ''))
      .join('');
    body += section(lbl.experience, items);
  }

  if (data.education?.some((e) => e.degree || e.school)) {
    const items = data.education
      .filter((e) => e.degree || e.school)
      .map((e) => row(e.degree, `${e.school || ''}${e.year ? ' | ' + e.year : ''}`))
      .join('');
    body += section(lbl.education, items);
  }

  if (data.skills)
    body += section(lbl.skills, para(data.skills));

  if (data.projects?.some((p) => p.name)) {
    const items = data.projects
      .filter((p) => p.name)
      .map((p) => row(p.name) + (p.description ? para(p.description) : ''))
      .join('');
    body += section(lbl.projects, items);
  }

  if (data.languages)
    body += section(lbl.languages, para(data.languages));

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${lang}">
<head>
  <meta charset="UTF-8"/>
  ${googleFont}
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: ${fontFamily};
      direction: ${dir};
      background: #fff;
      color: #1e293b;
      font-size: ${isAr ? '15px' : '13px'};
    }

    .header {
      background: #1e293b;
      color: #fff;
      padding: 24px 32px;
      text-align: center;
    }
    .header-name {
      font-size: ${isAr ? '28px' : '24px'};
      font-weight: 700;
      letter-spacing: ${isAr ? '0' : '1px'};
      margin-bottom: 5px;
    }
    .header-title {
      font-size: ${isAr ? '16px' : '13px'};
      opacity: 0.85;
      margin-bottom: 6px;
    }
    .header-contact {
      font-size: ${isAr ? '13px' : '10px'};
      opacity: 0.7;
    }

    .body { padding: 24px 32px; }

    .section { margin-bottom: 20px; }

    .section-title {
      font-size: ${isAr ? '15px' : '12px'};
      font-weight: 700;
      color: #1e293b;
      border-bottom: 1.5px solid #94a3b8;
      padding-bottom: 4px;
      margin-bottom: 10px;
      text-transform: ${isAr ? 'none' : 'uppercase'};
    }

    .row { margin-bottom: 8px; }
    .row-bold {
      font-size: ${isAr ? '15px' : '12px'};
      font-weight: 700;
      color: #1e293b;
    }
    .row-sub {
      font-size: ${isAr ? '13px' : '10px'};
      color: #64748b;
      margin-top: 2px;
    }

    .para {
      font-size: ${isAr ? '14px' : '11px'};
      color: #374151;
      line-height: 1.7;
      margin-bottom: 6px;
    }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      @page { margin: 0; size: A4; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-name">${data.name || ''}</div>
    <div class="header-title">${data.title || ''}</div>
    <div class="header-contact">${contactParts}</div>
  </div>
  <div class="body">${body}</div>
</body>
</html>`;
}

export const generateCV = (data, lang = 'en') => {
  const html = buildHTML(data, lang);
  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(html);
  win.document.close();

  // Wait for Cairo font to load then trigger print
  win.onload = () => {
    setTimeout(() => {
      win.focus();
      win.print();
    }, 800);
  };
};
