import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { personalInfo: p, careerInfo: c, preferences } = data;
  const isFresher = preferences.resumeType === 'fresher' || (data.experience.length === 0 && data.projects.length > 0);

  return (
    <div className="text-stone-900 leading-relaxed text-[11px] font-sans">
      {/* Modern Header with subtle colored top border & structured contact strip */}
      <header className="pb-3 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-950">
              {p.fullName || 'YOUR NAME'}
            </h1>
            {p.professionalTitle && (
              <p className="text-xs font-medium tracking-wide mt-0.5" style={{ color: accentColor }}>
                {p.professionalTitle}
              </p>
            )}
          </div>
          <div className="text-right text-[10px] text-stone-600 space-y-0.5">
            {p.email && <div><a href={`mailto:${p.email}`} className="hover:underline">{p.email}</a></div>}
            {p.phone && <div>{p.phone}</div>}
            {(p.city || p.country) && <div>{[p.city, p.state, p.country].filter(Boolean).join(', ')}</div>}
          </div>
        </div>

        {/* Links row */}
        {(p.linkedin || p.github || p.portfolio) && (
          <div className="flex gap-3 text-[10px] text-stone-600 mt-2 pt-1 border-t border-stone-200">
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn: {p.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</a>}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub: {p.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</a>}
            {p.portfolio && <a href={p.portfolio} target="_blank" rel="noreferrer" className="hover:underline">Portfolio: {p.portfolio.replace(/^https?:\/\//, '')}</a>}
          </div>
        )}
      </header>

      {/* Summary */}
      {c.professionalSummary && (
        <section className="mt-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
            Summary
          </h2>
          <p className="text-stone-700 leading-normal text-justify">
            {c.professionalSummary}
          </p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mt-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>{edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}</span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    {edu.startYear} – {edu.endYear || (edu.isCurrentlyStudying ? 'Present' : '')}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 text-[10.5px]">
                  <span>{edu.institution}</span>
                  {edu.location && <span>{edu.location}</span>}
                </div>
                {edu.gpa && <p className="text-[10px] text-stone-600"><span className="font-medium">CGPA/Score:</span> {edu.gpa}</p>}
                {edu.relevantCoursework && <p className="text-[10px] text-stone-500"><span className="font-medium">Coursework:</span> {edu.relevantCoursework}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="mt-3">
        <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
          Skills
        </h2>
        <div className="grid grid-cols-1 gap-1 text-stone-800">
          {data.skills.programmingLanguages.length > 0 && (
            <p><span className="font-semibold text-stone-900">Programming Languages:</span> {data.skills.programmingLanguages.join(', ')}</p>
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
          {data.skills.frameworks.length > 0 && (
            <p><span className="font-semibold text-stone-900">Frameworks:</span> {data.skills.frameworks.join(', ')}</p>
          )}
          {data.skills.tools.length > 0 && (
            <p><span className="font-semibold text-stone-900">Tools & Platforms:</span> {[...data.skills.tools, ...data.skills.devops].join(', ')}</p>
          )}
          {data.softSkills.length > 0 && (
            <p><span className="font-semibold text-stone-900">Core Competencies:</span> {data.softSkills.join(', ')}</p>
          )}
        </div>
      </section>

      {/* Work Experience */}
      {!isFresher && data.experience.length > 0 && (
        <section className="mt-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
            Work Experience
          </h2>
          <div className="space-y-2.5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>{exp.jobTitle} – <span className="font-normal text-stone-700">{exp.company}</span></span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-700">
                    {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-800 font-medium">
                    {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mt-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
            Featured Projects
          </h2>
          <div className="space-y-2">
            {data.projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>
                    {proj.name}
                    {proj.technologiesUsed.length > 0 && (
                      <span className="font-normal text-stone-500 text-[10px]"> | {proj.technologiesUsed.join(', ')}</span>
                    )}
                  </span>
                  <div className="space-x-2 text-[10px]">
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">Code</a>}
                    {proj.liveDemoUrl && <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">Demo</a>}
                  </div>
                </div>
                {proj.description && <p className="text-stone-700 text-justify mt-0.5">{proj.description}</p>}
                {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-700">
                    {proj.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                )}
                {proj.achievementsResults && proj.achievementsResults.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-800 font-medium">
                    {proj.achievementsResults.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships */}
      {data.internships.length > 0 && (
        <section className="mt-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
            Internship Experience
          </h2>
          <div className="space-y-2">
            {data.internships.map((intern) => (
              <div key={intern.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>{intern.internshipTitle} – {intern.company}</span>
                  <span className="text-[10px] text-stone-500 font-normal">{intern.startDate} – {intern.endDate}</span>
                </div>
                {intern.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-700">
                    {intern.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements in 2-col layout */}
      {(data.certifications.length > 0 || data.achievements.length > 0) && (
        <div className="grid grid-cols-2 gap-4 mt-3">
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
                Certificates
              </h2>
              <div className="space-y-1">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="avoid-break">
                    <p className="font-semibold text-stone-900">{cert.name}</p>
                    <p className="text-[10px] text-stone-500">{cert.issuingOrg} • {cert.issueDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.achievements.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-1 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
                Achievements
              </h2>
              <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-stone-700 text-[10.5px]">
                {data.achievements.map((ach) => (
                  <li key={ach.id}>
                    <span className="font-semibold text-stone-900">{ach.title}</span>
                    {ach.description && <span className="text-stone-600">: {ach.description}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mt-3">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-0.5 border-b border-stone-200 pb-0.5" style={{ color: accentColor }}>
            Languages
          </h2>
          <p className="text-stone-700 text-[10.5px]">
            {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};
