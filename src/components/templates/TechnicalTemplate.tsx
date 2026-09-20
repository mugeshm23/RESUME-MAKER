import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const TechnicalTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { personalInfo: p, careerInfo: c } = data;

  return (
    <div className="text-stone-900 leading-relaxed text-[11px] font-mono">
      {/* Developer Header */}
      <header className="border-b pb-2 mb-3 border-stone-300 font-sans">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950">
              {p.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-xs font-semibold text-stone-600 font-mono">
              &gt; {p.professionalTitle || 'Software Engineer'}
            </p>
          </div>
          <div className="text-right text-[10px] text-stone-600 font-mono space-y-0.5">
            {p.email && <div>{p.email}</div>}
            {p.phone && <div>{p.phone}</div>}
            {[p.city, p.country].filter(Boolean).length > 0 && (
              <div>{[p.city, p.country].filter(Boolean).join(', ')}</div>
            )}
          </div>
        </div>

        <div className="flex gap-4 text-[10px] font-mono text-stone-600 mt-2">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="text-stone-900 hover:underline">
              gh: {p.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
            </a>
          )}
          {p.linkedin && (
            <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-stone-900 hover:underline">
              in: {p.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
            </a>
          )}
          {p.portfolio && (
            <a href={p.portfolio} target="_blank" rel="noreferrer" className="text-stone-900 hover:underline">
              web: {p.portfolio.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      </header>

      {/* Technical Skills Section - First in Technical Template */}
      <section className="mb-3 font-sans">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: accentColor }}>
          // TECHNICAL SKILLS
        </h2>
        <div className="space-y-1 text-[10.5px]">
          {data.skills.programmingLanguages.length > 0 && (
            <div>
              <span className="font-semibold text-stone-900 font-mono">Languages: </span>
              <span className="text-stone-700">{data.skills.programmingLanguages.join(', ')}</span>
            </div>
          )}
          {data.skills.frontend.length > 0 && (
            <div>
              <span className="font-semibold text-stone-900 font-mono">Frontend: </span>
              <span className="text-stone-700">{data.skills.frontend.join(', ')}</span>
            </div>
          )}
          {data.skills.backend.length > 0 && (
            <div>
              <span className="font-semibold text-stone-900 font-mono">Backend: </span>
              <span className="text-stone-700">{data.skills.backend.join(', ')}</span>
            </div>
          )}
          {data.skills.databases.length > 0 && (
            <div>
              <span className="font-semibold text-stone-900 font-mono">Databases: </span>
              <span className="text-stone-700">{data.skills.databases.join(', ')}</span>
            </div>
          )}
          {data.skills.tools.length > 0 && (
            <div>
              <span className="font-semibold text-stone-900 font-mono">Tools/DevOps: </span>
              <span className="text-stone-700">{[...data.skills.tools, ...data.skills.devops].join(', ')}</span>
            </div>
          )}
        </div>
      </section>

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-3 font-sans">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: accentColor }}>
            // PROJECTS
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-bold text-stone-950">
                  <span>
                    {proj.name}
                    {proj.technologiesUsed.length > 0 && (
                      <span className="font-mono font-normal text-stone-500 text-[10px] ml-2">
                        [{proj.technologiesUsed.join(', ')}]
                      </span>
                    )}
                  </span>
                  <div className="space-x-2 text-[10px] font-mono">
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">src</a>}
                    {proj.liveDemoUrl && <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">live</a>}
                  </div>
                </div>
                {proj.description && <p className="text-stone-700 text-justify mt-0.5 text-[10.5px]">{proj.description}</p>}
                {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                  <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-700 text-[10.5px]">
                    {proj.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                )}
                {proj.achievementsResults && proj.achievementsResults.length > 0 && (
                  <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-900 font-medium text-[10.5px]">
                    {proj.achievementsResults.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-3 font-sans">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: accentColor }}>
            // EDUCATION
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-1.5 avoid-break">
              <div className="flex justify-between items-baseline font-semibold text-stone-900">
                <span>{edu.degree} in {edu.specialization} — {edu.institution}</span>
                <span className="text-[10px] font-mono text-stone-500">{edu.startYear} – {edu.endYear}</span>
              </div>
              {edu.gpa && <p className="text-[10px] text-stone-600 font-mono">CGPA: {edu.gpa}</p>}
              {edu.relevantCoursework && <p className="text-[10px] text-stone-600">Relevant: {edu.relevantCoursework}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Internships & Work Experience */}
      {(data.internships.length > 0 || data.experience.length > 0) && (
        <section className="mb-3 font-sans">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: accentColor }}>
            // EXPERIENCE
          </h2>
          {data.internships.map((intern) => (
            <div key={intern.id} className="mb-2 avoid-break">
              <div className="flex justify-between font-semibold text-stone-900">
                <span>{intern.internshipTitle} @ {intern.company}</span>
                <span className="text-[10px] font-mono text-stone-500">{intern.startDate} – {intern.endDate}</span>
              </div>
              <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-700 text-[10.5px]">
                {intern.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-2 avoid-break">
              <div className="flex justify-between font-semibold text-stone-900">
                <span>{exp.jobTitle} @ {exp.company}</span>
                <span className="text-[10px] font-mono text-stone-500">{exp.startDate} – {exp.endDate}</span>
              </div>
              <ul className="list-disc ml-4 mt-0.5 space-y-0.5 text-stone-700 text-[10.5px]">
                {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Certifications & Achievements */}
      {(data.certifications.length > 0 || data.achievements.length > 0) && (
        <section className="mb-2 font-sans">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 font-mono" style={{ color: accentColor }}>
            // HONORS & CERTIFICATIONS
          </h2>
          <ul className="list-disc ml-4 space-y-0.5 text-[10.5px] text-stone-700">
            {data.certifications.map((c) => (
              <li key={c.id}>
                <span className="font-semibold text-stone-900">{c.name}</span> — {c.issuingOrg} ({c.issueDate})
              </li>
            ))}
            {data.achievements.map((a) => (
              <li key={a.id}>
                <span className="font-semibold text-stone-900">{a.title}</span>: {a.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
