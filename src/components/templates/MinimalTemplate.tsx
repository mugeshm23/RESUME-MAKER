import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { personalInfo: p, careerInfo: c } = data;

  return (
    <div className="text-stone-900 leading-relaxed text-[10.5px] font-sans">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-xl font-bold tracking-tight text-stone-950">
          {p.fullName || 'YOUR NAME'}
        </h1>
        {p.professionalTitle && (
          <p className="text-[11px] font-medium text-stone-600 mt-0.5">
            {p.professionalTitle}
          </p>
        )}
        <p className="text-[10px] text-stone-500 mt-1">
          {[
            p.email,
            p.phone,
            [p.city, p.state, p.country].filter(Boolean).join(', '),
            p.linkedin,
            p.github,
          ].filter(Boolean).join('  |  ')}
        </p>
      </header>

      {/* Summary */}
      {c.professionalSummary && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-1 border-b border-stone-200 pb-0.5">
            Overview
          </h2>
          <p className="text-stone-700 leading-normal text-justify">{c.professionalSummary}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-1 border-b border-stone-200 pb-0.5">
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-1.5 avoid-break">
              <div className="flex justify-between font-medium">
                <span>{edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}</span>
                <span className="text-stone-500 text-[9.5px]">{edu.startYear} – {edu.endYear}</span>
              </div>
              <p className="text-stone-600 text-[10px]">{edu.institution} {edu.gpa ? `• CGPA: ${edu.gpa}` : ''}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      <section className="mb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-1 border-b border-stone-200 pb-0.5">
          Skills
        </h2>
        <div className="text-stone-700 space-y-0.5">
          {data.skills.programmingLanguages.length > 0 && (
            <p><span className="font-semibold text-stone-900">Languages:</span> {data.skills.programmingLanguages.join(', ')}</p>
          )}
          {data.skills.frontend.length > 0 && (
            <p><span className="font-semibold text-stone-900">Frontend:</span> {data.skills.frontend.join(', ')}</p>
          )}
          {data.skills.backend.length > 0 && (
            <p><span className="font-semibold text-stone-900">Backend:</span> {data.skills.backend.join(', ')}</p>
          )}
          {data.skills.databases.length > 0 && (
            <p><span className="font-semibold text-stone-900">Databases:</span> {data.skills.databases.join(', ')}</p>
          )}
          {data.skills.tools.length > 0 && (
            <p><span className="font-semibold text-stone-900">Tools:</span> {data.skills.tools.join(', ')}</p>
          )}
        </div>
      </section>

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-1 border-b border-stone-200 pb-0.5">
            Key Projects
          </h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="mb-2 avoid-break">
              <div className="flex justify-between font-medium">
                <span>{proj.name}</span>
                {proj.technologiesUsed.length > 0 && (
                  <span className="text-stone-500 text-[9.5px]">{proj.technologiesUsed.join(', ')}</span>
                )}
              </div>
              {proj.description && <p className="text-stone-700 mt-0.5">{proj.description}</p>}
              {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-600">
                  {proj.keyFeatures.map((kf, i) => <li key={i}>{kf}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Internships & Experience */}
      {(data.internships.length > 0 || data.experience.length > 0) && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-1 border-b border-stone-200 pb-0.5">
            Experience & Internships
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-1.5 avoid-break">
              <div className="flex justify-between font-medium">
                <span>{exp.jobTitle} — {exp.company}</span>
                <span className="text-stone-500 text-[9.5px]">{exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-stone-600">
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
          {data.internships.map((intern) => (
            <div key={intern.id} className="mb-1.5 avoid-break">
              <div className="flex justify-between font-medium">
                <span>{intern.internshipTitle} — {intern.company}</span>
                <span className="text-stone-500 text-[9.5px]">{intern.startDate} – {intern.endDate}</span>
              </div>
              <ul className="list-disc ml-4 space-y-0.5 text-stone-600">
                {intern.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Achievements */}
      {(data.certifications.length > 0 || data.achievements.length > 0) && (
        <section className="mb-3">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-stone-900 mb-1 border-b border-stone-200 pb-0.5">
            Credentials & Achievements
          </h2>
          <ul className="list-disc ml-4 space-y-0.5 text-stone-700">
            {data.certifications.map((c) => (
              <li key={c.id}><span className="font-medium">{c.name}</span> — {c.issuingOrg} ({c.issueDate})</li>
            ))}
            {data.achievements.map((a) => (
              <li key={a.id}><span className="font-medium">{a.title}</span>: {a.description}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
