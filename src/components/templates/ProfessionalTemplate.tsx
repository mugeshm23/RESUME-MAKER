import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { personalInfo: p, careerInfo: c } = data;

  return (
    <div className="text-stone-900 leading-relaxed text-[11px] font-sans">
      {/* Executive Header */}
      <header className="border-b-2 pb-3 mb-3" style={{ borderColor: accentColor }}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-stone-950 uppercase">
              {p.fullName || 'YOUR NAME'}
            </h1>
            {p.professionalTitle && (
              <p className="text-xs font-bold tracking-wider uppercase mt-0.5 text-stone-600">
                {p.professionalTitle}
              </p>
            )}
          </div>
          <div className="text-right text-[10px] text-stone-600 space-y-0.5">
            {p.email && <div><a href={`mailto:${p.email}`} className="hover:underline">{p.email}</a></div>}
            {p.phone && <div>{p.phone}</div>}
            {[p.city, p.state, p.country].filter(Boolean).length > 0 && (
              <div>{[p.city, p.state, p.country].filter(Boolean).join(', ')}</div>
            )}
            {p.linkedin && (
              <div>
                <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {c.professionalSummary && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: accentColor }}>
            <span className="w-2.5 h-0.5 inline-block" style={{ backgroundColor: accentColor }}></span>
            Executive Profile
          </h2>
          <p className="text-stone-700 leading-relaxed text-justify">{c.professionalSummary}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: accentColor }}>
            <span className="w-2.5 h-0.5 inline-block" style={{ backgroundColor: accentColor }}></span>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-1.5 avoid-break">
              <div className="flex justify-between items-baseline font-bold text-stone-900">
                <span>{edu.degree} in {edu.specialization || 'Engineering'}</span>
                <span className="text-[10px] font-normal text-stone-600">{edu.startYear} – {edu.endYear}</span>
              </div>
              <p className="text-stone-600 text-[10px]">{edu.institution} {edu.location ? `• ${edu.location}` : ''}</p>
              {edu.gpa && <p className="text-[10px] text-stone-500 font-medium">Cumulative Grade: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Technical Skills */}
      <section className="mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: accentColor }}>
          <span className="w-2.5 h-0.5 inline-block" style={{ backgroundColor: accentColor }}></span>
          Core Competencies & Technical Skills
        </h2>
        <div className="space-y-0.5 text-stone-700">
          {data.skills.programmingLanguages.length > 0 && (
            <p><span className="font-semibold text-stone-900">Languages:</span> {data.skills.programmingLanguages.join(', ')}</p>
          )}
          {data.skills.frontend.length > 0 && (
            <p><span className="font-semibold text-stone-900">Frontend:</span> {data.skills.frontend.join(', ')}</p>
          )}
          {data.skills.backend.length > 0 && (
            <p><span className="font-semibold text-stone-900">Backend & API:</span> {data.skills.backend.join(', ')}</p>
          )}
          {data.skills.databases.length > 0 && (
            <p><span className="font-semibold text-stone-900">Databases:</span> {data.skills.databases.join(', ')}</p>
          )}
          {data.skills.tools.length > 0 && (
            <p><span className="font-semibold text-stone-900">Developer Tools:</span> {[...data.skills.tools, ...data.skills.devops].join(', ')}</p>
          )}
        </div>
      </section>

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: accentColor }}>
            <span className="w-2.5 h-0.5 inline-block" style={{ backgroundColor: accentColor }}></span>
            Key Technical Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-bold text-stone-900">
                  <span>{proj.name} {proj.role ? `(${proj.role})` : ''}</span>
                  {proj.technologiesUsed.length > 0 && (
                    <span className="text-[10px] font-normal text-stone-500">{proj.technologiesUsed.slice(0, 4).join(', ')}</span>
                  )}
                </div>
                {proj.description && <p className="text-stone-700 text-justify mt-0.5">{proj.description}</p>}
                {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                  <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-700">
                    {proj.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships & Experience */}
      {(data.internships.length > 0 || data.experience.length > 0) && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: accentColor }}>
            <span className="w-2.5 h-0.5 inline-block" style={{ backgroundColor: accentColor }}></span>
            Experience & Internships
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-2 avoid-break">
              <div className="flex justify-between font-bold text-stone-900">
                <span>{exp.jobTitle} — {exp.company}</span>
                <span className="text-[10px] font-normal text-stone-600">{exp.startDate} – {exp.endDate}</span>
              </div>
              <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-700">
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
          {data.internships.map((intern) => (
            <div key={intern.id} className="mb-2 avoid-break">
              <div className="flex justify-between font-bold text-stone-900">
                <span>{intern.internshipTitle} — {intern.company}</span>
                <span className="text-[10px] font-normal text-stone-600">{intern.startDate} – {intern.endDate}</span>
              </div>
              <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-700">
                {intern.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: accentColor }}>
            <span className="w-2.5 h-0.5 inline-block" style={{ backgroundColor: accentColor }}></span>
            Certifications
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-stone-700">
            {data.certifications.map((c) => (
              <span key={c.id} className="text-[10.5px]">
                <strong className="text-stone-900">{c.name}</strong> ({c.issuingOrg})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
