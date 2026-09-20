import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, accentColor }) => {
  const { personalInfo: p, careerInfo: c, preferences } = data;
  const isFresher = preferences.resumeType === 'fresher' || (data.experience.length === 0 && data.projects.length > 0);

  const contactItems = [
    p.email && `<a href="mailto:${p.email}" class="hover:underline">${p.email}</a>`,
    p.phone,
    [p.city, p.state, p.country].filter(Boolean).join(', '),
    p.linkedin && `<a href="${p.linkedin}" target="_blank" rel="noreferrer" class="hover:underline">LinkedIn</a>`,
    p.github && `<a href="${p.github}" target="_blank" rel="noreferrer" class="hover:underline">GitHub</a>`,
    p.portfolio && `<a href="${p.portfolio}" target="_blank" rel="noreferrer" class="hover:underline">Portfolio</a>`,
  ].filter(Boolean);

  const renderSectionHeader = (title: string) => (
    <div className="mb-2 mt-4 border-b pb-1" style={{ borderColor: accentColor }}>
      <h2
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color: accentColor }}
      >
        {title}
      </h2>
    </div>
  );

  return (
    <div className="text-stone-900 leading-relaxed text-[11px] font-sans">
      {/* Header */}
      <header className="text-center pb-3 border-b border-stone-300">
        <h1 className="text-2xl font-bold tracking-tight text-stone-950 uppercase mb-1">
          {p.fullName || 'YOUR NAME'}
        </h1>
        {p.professionalTitle && (
          <p className="text-xs font-semibold text-stone-700 tracking-wide uppercase mb-2">
            {p.professionalTitle}
          </p>
        )}
        <div
          className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-[10px] text-stone-600"
          dangerouslySetInnerHTML={{
            __html: contactItems.join(' <span class="text-stone-400">•</span> '),
          }}
        />
      </header>

      {/* Summary */}
      {c.professionalSummary && (
        <section className="mt-3">
          {renderSectionHeader('Professional Summary')}
          <p className="text-stone-700 text-justify leading-normal">
            {c.professionalSummary}
          </p>
        </section>
      )}

      {/* Education (Prioritized for freshers) */}
      {data.education.length > 0 && (
        <section>
          {renderSectionHeader('Education')}
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>
                    {edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}
                  </span>
                  <span className="text-[10px] text-stone-600 font-normal">
                    {edu.startYear} – {edu.endYear || (edu.isCurrentlyStudying ? 'Present' : '')}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-stone-700">
                  <span className="italic">{edu.institution}</span>
                  {edu.location && <span className="text-[10px] text-stone-500">{edu.location}</span>}
                </div>
                {edu.gpa && (
                  <p className="text-stone-600 text-[10.5px]">
                    <span className="font-medium">Score/CGPA:</span> {edu.gpa}
                  </p>
                )}
                {edu.relevantCoursework && (
                  <p className="text-stone-600 text-[10px]">
                    <span className="font-medium">Coursework:</span> {edu.relevantCoursework}
                  </p>
                )}
                {edu.academicAchievements && (
                  <p className="text-stone-600 text-[10px] italic">
                    • {edu.academicAchievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section>
        {renderSectionHeader('Technical Skills')}
        <div className="space-y-1 text-stone-800">
          {data.skills.programmingLanguages.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Languages:</span>{' '}
              {data.skills.programmingLanguages.join(', ')}
            </p>
          )}
          {data.skills.frontend.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Frontend:</span>{' '}
              {data.skills.frontend.join(', ')}
            </p>
          )}
          {data.skills.backend.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Backend:</span>{' '}
              {data.skills.backend.join(', ')}
            </p>
          )}
          {data.skills.databases.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Databases:</span>{' '}
              {data.skills.databases.join(', ')}
            </p>
          )}
          {data.skills.frameworks.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Frameworks:</span>{' '}
              {data.skills.frameworks.join(', ')}
            </p>
          )}
          {data.skills.cloud.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Cloud & DevOps:</span>{' '}
              {[...data.skills.cloud, ...data.skills.devops].join(', ')}
            </p>
          )}
          {data.skills.tools.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Developer Tools:</span>{' '}
              {data.skills.tools.join(', ')}
            </p>
          )}
          {data.softSkills.length > 0 && (
            <p>
              <span className="font-semibold text-stone-900">Soft Skills:</span>{' '}
              {data.softSkills.join(', ')}
            </p>
          )}
        </div>
      </section>

      {/* Work Experience (if not fresher or has experience) */}
      {!isFresher && data.experience.length > 0 && (
        <section>
          {renderSectionHeader('Professional Experience')}
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>{exp.jobTitle}</span>
                  <span className="text-[10px] text-stone-600 font-normal">
                    {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-stone-700 italic">
                  <span>{exp.company} {exp.employmentType ? `(${exp.employmentType})` : ''}</span>
                  {exp.location && <span className="text-[10px] text-stone-500 not-italic">{exp.location}</span>}
                </div>
                {exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-stone-700">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-700">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="font-medium text-stone-800">{ach}</li>
                    ))}
                  </ul>
                )}
                {exp.technologiesUsed.length > 0 && (
                  <p className="text-[10px] text-stone-500 mt-0.5">
                    <span className="font-medium text-stone-600">Technologies:</span> {exp.technologiesUsed.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          {renderSectionHeader('Technical Projects')}
          <div className="space-y-2.5">
            {data.projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span className="text-stone-950 font-bold">
                    {proj.name}
                    {proj.role && <span className="font-normal text-stone-600"> | {proj.role}</span>}
                  </span>
                  <div className="space-x-2 text-[10px]">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                        Code Link
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {proj.technologiesUsed.length > 0 && (
                  <p className="text-[10px] text-stone-600 italic">
                    Tech Stack: {proj.technologiesUsed.join(', ')}
                  </p>
                )}

                {proj.description && (
                  <p className="text-stone-700 text-justify mt-0.5">
                    {proj.description}
                  </p>
                )}

                {proj.keyFeatures && proj.keyFeatures.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-700">
                    {proj.keyFeatures.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                )}

                {proj.achievementsResults && proj.achievementsResults.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-800 font-medium">
                    {proj.achievementsResults.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships */}
      {data.internships.length > 0 && (
        <section>
          {renderSectionHeader('Internships')}
          <div className="space-y-2">
            {data.internships.map((intern) => (
              <div key={intern.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>{intern.internshipTitle} – {intern.company}</span>
                  <span className="text-[10px] text-stone-600 font-normal">
                    {intern.startDate} – {intern.endDate}
                  </span>
                </div>
                {intern.location && (
                  <p className="text-[10px] text-stone-500 italic">
                    {intern.location} {intern.isRemote ? '(Remote)' : ''}
                  </p>
                )}
                {intern.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-700">
                    {intern.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                )}
                {intern.achievements.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-stone-800 font-medium">
                    {intern.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          {renderSectionHeader('Certifications')}
          <div className="space-y-1">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline avoid-break">
                <span className="font-semibold text-stone-900">
                  {cert.name} <span className="font-normal text-stone-600">— {cert.issuingOrg}</span>
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="ml-1.5 text-[9.5px] text-blue-700 hover:underline">
                      [Verify]
                    </a>
                  )}
                </span>
                <span className="text-[10px] text-stone-500">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section>
          {renderSectionHeader('Honors & Achievements')}
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-stone-700">
            {data.achievements.map((ach) => (
              <li key={ach.id}>
                <span className="font-semibold text-stone-900">{ach.title}</span>
                {ach.organization && <span> ({ach.organization})</span>}
                {ach.description && <span className="text-stone-600">: {ach.description}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Positions of Responsibility */}
      {data.positionsOfResponsibility.length > 0 && (
        <section>
          {renderSectionHeader('Leadership & Positions of Responsibility')}
          <div className="space-y-1.5">
            {data.positionsOfResponsibility.map((pos) => (
              <div key={pos.id} className="avoid-break">
                <div className="flex justify-between items-baseline font-semibold text-stone-900">
                  <span>{pos.position} – {pos.organization}</span>
                  <span className="text-[10px] text-stone-500 font-normal">{pos.duration}</span>
                </div>
                {pos.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-stone-700">
                    {pos.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section>
          {renderSectionHeader('Languages')}
          <p className="text-stone-700">
            {data.languages.map((l) => `${l.language} (${l.proficiency})`).join(' • ')}
          </p>
        </section>
      )}

      {/* References (if requested) */}
      {preferences.includeReferences && data.references.length > 0 && (
        <section>
          {renderSectionHeader('References')}
          <div className="grid grid-cols-2 gap-2 text-stone-700">
            {data.references.map((ref) => (
              <div key={ref.id} className="border border-stone-200 p-1.5 rounded">
                <p className="font-semibold text-stone-900">{ref.name}</p>
                <p className="text-[10px]">{ref.jobTitle} - {ref.organization}</p>
                <p className="text-[10px] text-stone-500">{ref.email} | {ref.phone}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
