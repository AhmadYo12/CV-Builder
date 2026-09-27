import React, { useState } from 'react';
import { generateCV } from '../utils/generateCV';
import './CVForm.css';

const t = {
  en: {
    title: 'CV Builder',
    download: '⬇ Download CV',
    tabs: ['👤 Personal', '💼 Experience', '🎓 Education', '🛠 Skills', '🚀 Projects'],
    tabIds: ['personal', 'experience', 'education', 'skills', 'projects'],
    personal: 'Personal Information',
    fullName: 'Full Name', jobTitle: 'Job Title', email: 'Email', phone: 'Phone',
    location: 'Location', github: 'GitHub', linkedin: 'LinkedIn',
    summary: 'Professional Summary', languages: 'Languages',
    summaryPh: 'Write a brief summary about yourself...',
    langPh: 'Arabic (Native), English (Intermediate)',
    experience: 'Work Experience', expNum: (i) => `Experience #${i + 1}`,
    role: 'Job Title', company: 'Company', period: 'Period', description: 'Description',
    rolePh: 'Frontend Developer', companyPh: 'Company Name', periodPh: '2023 - Present',
    descPh: 'Describe your responsibilities...',
    addExp: '+ Add Experience',
    education: 'Education', eduNum: (i) => `Education #${i + 1}`,
    degree: 'Degree / Major', school: 'University / School', year: 'Year',
    degreePh: 'Computer Engineering', schoolPh: 'Damascus University', yearPh: '2020 - 2025',
    addEdu: '+ Add Education',
    skills: 'Skills', skillsLabel: 'Technical Skills',
    skillsPh: 'JavaScript, React.js, TypeScript, Tailwind CSS, Git...',
    projects: 'Projects', projNum: (i) => `Project #${i + 1}`,
    projName: 'Project Name', projNamePh: 'My Awesome Project',
    projDescPh: 'Describe the project, technologies used...',
    addProj: '+ Add Project',
    namePh: 'Ahmad Yousef', titlePh: 'Frontend Developer',
    emailPh: 'email@example.com', phonePh: '+963 xxx xxx xxx', locationPh: 'Damascus, Syria',
    githubPh: 'username', linkedinPh: 'profile-url',
  },
  ar: {
    title: 'منشئ السيرة الذاتية',
    download: '⬇ تحميل السيرة الذاتية',
    tabs: ['👤 شخصي', '💼 الخبرات', '🎓 التعليم', '🛠 المهارات', '🚀 المشاريع'],
    tabIds: ['personal', 'experience', 'education', 'skills', 'projects'],
    personal: 'المعلومات الشخصية',
    fullName: 'الاسم الكامل', jobTitle: 'المسمى الوظيفي', email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف', location: 'الموقع', github: 'GitHub', linkedin: 'LinkedIn',
    summary: 'الملخص المهني', languages: 'اللغات',
    summaryPh: 'اكتب ملخصاً مختصراً عن نفسك...',
    langPh: 'العربية (اللغة الأم)، الإنجليزية (متوسط)',
    experience: 'الخبرات العملية', expNum: (i) => `الخبرة #${i + 1}`,
    role: 'المسمى الوظيفي', company: 'الشركة', period: 'الفترة', description: 'الوصف',
    rolePh: 'مطور واجهات أمامية', companyPh: 'اسم الشركة', periodPh: '2023 - حتى الآن',
    descPh: 'صف مهامك ومسؤولياتك...',
    addExp: '+ إضافة خبرة',
    education: 'التعليم', eduNum: (i) => `التعليم #${i + 1}`,
    degree: 'الدرجة العلمية / التخصص', school: 'الجامعة / المدرسة', year: 'السنة',
    degreePh: 'هندسة الحاسوب', schoolPh: 'جامعة دمشق', yearPh: '2020 - 2025',
    addEdu: '+ إضافة تعليم',
    skills: 'المهارات', skillsLabel: 'المهارات التقنية',
    skillsPh: 'JavaScript، React.js، TypeScript، Tailwind CSS، Git...',
    projects: 'المشاريع', projNum: (i) => `المشروع #${i + 1}`,
    projName: 'اسم المشروع', projNamePh: 'مشروعي الرائع',
    projDescPh: 'صف المشروع والتقنيات المستخدمة...',
    addProj: '+ إضافة مشروع',
    namePh: 'أحمد يوسف', titlePh: 'مطور واجهات أمامية',
    emailPh: 'email@example.com', phonePh: '+963 xxx xxx xxx', locationPh: 'دمشق، سوريا',
    githubPh: 'username', linkedinPh: 'profile-url',
  },
};

const defaultData = {
  name: '', title: '', email: '', phone: '', location: '',
  github: '', linkedin: '', summary: '', skills: '', languages: '',
  experience: [{ role: '', company: '', period: '', description: '' }],
  education: [{ degree: '', school: '', year: '' }],
  projects: [{ name: '', description: '' }],
};

export default function CVForm() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState('personal');
  const [lang, setLang] = useState('en');

  const l = t[lang];
  const isRtl = lang === 'ar';

  const set = (field, value) => setData((d) => ({ ...d, [field]: value }));
  const setList = (field, index, key, value) => {
    setData((d) => {
      const arr = [...d[field]];
      arr[index] = { ...arr[index], [key]: value };
      return { ...d, [field]: arr };
    });
  };
  const addItem = (field, template) => setData((d) => ({ ...d, [field]: [...d[field], template] }));
  const removeItem = (field, index) => setData((d) => ({ ...d, [field]: d[field].filter((_, i) => i !== index) }));

  return (
    <div className={`cv-builder${isRtl ? ' rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="cv-header">
        <h1>{l.title}</h1>
        <div className="header-actions">
          <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
            {lang === 'en' ? '🌐 العربية' : '🌐 English'}
          </button>
          <button className="download-btn" onClick={() => generateCV(data, lang)}>
            {l.download}
          </button>
        </div>
      </header>

      <div className="cv-tabs">
        {l.tabs.map((label, idx) => (
          <button
            key={l.tabIds[idx]}
            className={`tab-btn ${activeTab === l.tabIds[idx] ? 'active' : ''}`}
            onClick={() => setActiveTab(l.tabIds[idx])}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="cv-content">
        {activeTab === 'personal' && (
          <div className="section">
            <h2>{l.personal}</h2>
            <div className="grid-2">
              <Field label={l.fullName} value={data.name} onChange={(v) => set('name', v)} placeholder={l.namePh} />
              <Field label={l.jobTitle} value={data.title} onChange={(v) => set('title', v)} placeholder={l.titlePh} />
              <Field label={l.email} value={data.email} onChange={(v) => set('email', v)} placeholder={l.emailPh} />
              <Field label={l.phone} value={data.phone} onChange={(v) => set('phone', v)} placeholder={l.phonePh} />
              <Field label={l.location} value={data.location} onChange={(v) => set('location', v)} placeholder={l.locationPh} />
              <Field label={l.github} value={data.github} onChange={(v) => set('github', v)} placeholder={l.githubPh} />
              <Field label={l.linkedin} value={data.linkedin} onChange={(v) => set('linkedin', v)} placeholder={l.linkedinPh} />
            </div>
            <TextArea label={l.summary} value={data.summary} onChange={(v) => set('summary', v)} placeholder={l.summaryPh} rows={5} />
            <TextArea label={l.languages} value={data.languages} onChange={(v) => set('languages', v)} placeholder={l.langPh} rows={2} />
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="section">
            <h2>{l.experience}</h2>
            {data.experience.map((exp, i) => (
              <div className="card" key={i}>
                <div className="card-header">
                  <span>{l.expNum(i)}</span>
                  {data.experience.length > 1 && <button className="remove-btn" onClick={() => removeItem('experience', i)}>✕</button>}
                </div>
                <div className="grid-2">
                  <Field label={l.role} value={exp.role} onChange={(v) => setList('experience', i, 'role', v)} placeholder={l.rolePh} />
                  <Field label={l.company} value={exp.company} onChange={(v) => setList('experience', i, 'company', v)} placeholder={l.companyPh} />
                  <Field label={l.period} value={exp.period} onChange={(v) => setList('experience', i, 'period', v)} placeholder={l.periodPh} />
                </div>
                <TextArea label={l.description} value={exp.description} onChange={(v) => setList('experience', i, 'description', v)} placeholder={l.descPh} rows={3} />
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('experience', { role: '', company: '', period: '', description: '' })}>{l.addExp}</button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="section">
            <h2>{l.education}</h2>
            {data.education.map((edu, i) => (
              <div className="card" key={i}>
                <div className="card-header">
                  <span>{l.eduNum(i)}</span>
                  {data.education.length > 1 && <button className="remove-btn" onClick={() => removeItem('education', i)}>✕</button>}
                </div>
                <div className="grid-2">
                  <Field label={l.degree} value={edu.degree} onChange={(v) => setList('education', i, 'degree', v)} placeholder={l.degreePh} />
                  <Field label={l.school} value={edu.school} onChange={(v) => setList('education', i, 'school', v)} placeholder={l.schoolPh} />
                  <Field label={l.year} value={edu.year} onChange={(v) => setList('education', i, 'year', v)} placeholder={l.yearPh} />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('education', { degree: '', school: '', year: '' })}>{l.addEdu}</button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="section">
            <h2>{l.skills}</h2>
            <TextArea label={l.skillsLabel} value={data.skills} onChange={(v) => set('skills', v)} placeholder={l.skillsPh} rows={6} />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="section">
            <h2>{l.projects}</h2>
            {data.projects.map((proj, i) => (
              <div className="card" key={i}>
                <div className="card-header">
                  <span>{l.projNum(i)}</span>
                  {data.projects.length > 1 && <button className="remove-btn" onClick={() => removeItem('projects', i)}>✕</button>}
                </div>
                <Field label={l.projName} value={proj.name} onChange={(v) => setList('projects', i, 'name', v)} placeholder={l.projNamePh} />
                <TextArea label={l.description} value={proj.description} onChange={(v) => setList('projects', i, 'description', v)} placeholder={l.projDescPh} rows={3} />
              </div>
            ))}
            <button className="add-btn" onClick={() => addItem('projects', { name: '', description: '' })}>{l.addProj}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div className="field full">
      <label>{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} />
    </div>
  );
}
