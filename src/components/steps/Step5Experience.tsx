import React, { useState } from 'react';
import { WorkExperienceItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Briefcase, Plus, Trash2, Sparkles, CheckCircle2, Info, RefreshCw } from 'lucide-react';

interface Step5Props {
  experience: WorkExperienceItem[];
  onChange: (experience: WorkExperienceItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step5Experience: React.FC<Step5Props> = ({
  experience,
  onChange,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const [enhancingKey, setEnhancingKey] = useState<string | null>(null);

  const addExperience = () => {
    const newItem: WorkExperienceItem = {
      id: 'exp_' + Date.now(),
      jobTitle: '',
      company: '',
      employmentType: 'Full-time',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      responsibilities: [''],
      achievements: [''],
      technologiesUsed: [],
    };
    onChange([...experience, newItem]);
  };

  const updateItem = (id: string, field: keyof WorkExperienceItem, value: any) => {
    onChange(
      experience.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(experience.filter((item) => item.id !== id));
  };

  // Structured responsibilities
  const addResponsibility = (expId: string) => {
    onChange(
      experience.map((item) =>
        item.id === expId
          ? { ...item, responsibilities: [...item.responsibilities, ''] }
          : item
      )
    );
  };

  const updateResponsibility = (expId: string, idx: number, val: string) => {
    onChange(
      experience.map((item) => {
        if (item.id !== expId) return item;
        const copy = [...item.responsibilities];
        copy[idx] = val;
        return { ...item, responsibilities: copy };
      })
    );
  };

  const removeResponsibility = (expId: string, idx: number) => {
    onChange(
      experience.map((item) => {
        if (item.id !== expId) return item;
        return {
          ...item,
          responsibilities: item.responsibilities.filter((_, i) => i !== idx),
        };
      })
    );
  };

  // Structured achievements
  const addAchievement = (expId: string) => {
    onChange(
      experience.map((item) =>
        item.id === expId
          ? { ...item, achievements: [...item.achievements, ''] }
          : item
      )
    );
  };

  const updateAchievement = (expId: string, idx: number, val: string) => {
    onChange(
      experience.map((item) => {
        if (item.id !== expId) return item;
        const copy = [...item.achievements];
        copy[idx] = val;
        return { ...item, achievements: copy };
      })
    );
  };

  const removeAchievement = (expId: string, idx: number) => {
    onChange(
      experience.map((item) => {
        if (item.id !== expId) return item;
        return {
          ...item,
          achievements: item.achievements.filter((_, i) => i !== idx),
        };
      })
    );
  };

  // AI Polish Bullet
  const handleEnhanceBullet = async (
    expId: string,
    field: 'responsibilities' | 'achievements',
    idx: number,
    text: string,
    role: string
  ) => {
    if (!text.trim()) return;
    const key = `${expId}-${field}-${idx}`;
    setEnhancingKey(key);

    try {
      const res = await fetch('/api/ai/enhance-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputItem: text,
          contextType: 'Work Experience',
          roleOrTitle: role,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.bullet) {
          if (field === 'responsibilities') {
            updateResponsibility(expId, idx, data.bullet);
          } else {
            updateAchievement(expId, idx, data.bullet);
          }
        }
      }
    } catch (err) {
      console.error('Failed to enhance bullet:', err);
    } finally {
      setEnhancingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Do you have any past employment or work experience?</p>
        <p className="text-blue-700 text-xs mt-0.5">
          This section is for full-time, part-time, or contract employment. If you are a student or fresher with no work experience, you can skip this section completely!
        </p>
      </div>

      {/* Fresher Empty State Banner */}
      {experience.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center space-y-4 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-base font-bold text-stone-900">
              No work experience yet? That's completely okay!
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Employers love seeing passion, hands-on student projects, internships, verified certifications, hackathons, and college achievements. You can continue or skip to the next step.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              id="btn-add-first-experience"
              onClick={addExperience}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Work Experience</span>
            </button>
            <button
              type="button"
              id="btn-skip-fresher-experience"
              onClick={onNext}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold transition-colors"
            >
              Skip (I am a fresher) →
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4 relative"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Experience #{index + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(exp.id)}
                  className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Junior Software Engineer"
                    value={exp.jobTitle}
                    onChange={(e) => updateItem(exp.id, 'jobTitle', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tech Solutions Inc."
                    value={exp.company}
                    onChange={(e) => updateItem(exp.id, 'company', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Dates & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Employment Type
                  </label>
                  <select
                    value={exp.employmentType}
                    onChange={(e) => updateItem(exp.id, 'employmentType', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jan 2024"
                    value={exp.startDate}
                    onChange={(e) => updateItem(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 2024 or Present"
                    value={exp.endDate}
                    disabled={exp.currentlyWorking}
                    onChange={(e) => updateItem(exp.id, 'endDate', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <label className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.currentlyWorking}
                      onChange={(e) => updateItem(exp.id, 'currentlyWorking', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>I am currently working here</span>
                  </label>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Responsibilities (Key tasks & contributions)
                  </label>
                  <span className="text-[11px] text-stone-500">Add individual bullet points</span>
                </div>

                <div className="space-y-2">
                  {exp.responsibilities.map((resp, idx) => {
                    const isEnhancingThis = enhancingKey === `${exp.id}-responsibilities-${idx}`;
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-stone-400 mt-2 font-mono text-xs">•</span>
                        <input
                          type="text"
                          placeholder="e.g. Developed REST APIs for user authentication using Node.js"
                          value={resp}
                          onChange={(e) => updateResponsibility(exp.id, idx, e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleEnhanceBullet(
                              exp.id,
                              'responsibilities',
                              idx,
                              resp,
                              exp.jobTitle || 'Engineer'
                            )
                          }
                          disabled={isEnhancingThis || !resp.trim()}
                          className="px-2.5 py-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md flex items-center gap-1 shrink-0 border border-blue-200 transition-colors disabled:opacity-40"
                          title="Convert to professional action-oriented bullet point without fabricating facts"
                        >
                          {isEnhancingThis ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Sparkles className="w-3 h-3" />
                          )}
                          <span className="hidden sm:inline">Polish</span>
                        </button>
                        {exp.responsibilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResponsibility(exp.id, idx)}
                            className="text-stone-400 hover:text-rose-600 mt-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => addResponsibility(exp.id)}
                  className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Responsibility</span>
                </button>
              </div>

              {/* Achievements */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                    Achievements & Measurable Results (Optional)
                  </label>
                  <span className="text-[11px] text-stone-500">Include awards, promotions, or delivery milestones</span>
                </div>

                <div className="space-y-2">
                  {exp.achievements.map((ach, idx) => {
                    const isEnhancingThis = enhancingKey === `${exp.id}-achievements-${idx}`;
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-2 font-mono text-xs">✓</span>
                        <input
                          type="text"
                          placeholder="e.g. Awarded Best Contributor of the Quarter for Q3"
                          value={ach}
                          onChange={(e) => updateAchievement(exp.id, idx, e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleEnhanceBullet(
                              exp.id,
                              'achievements',
                              idx,
                              ach,
                              exp.jobTitle || 'Engineer'
                            )
                          }
                          disabled={isEnhancingThis || !ach.trim()}
                          className="px-2.5 py-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md flex items-center gap-1 shrink-0 border border-blue-200 transition-colors disabled:opacity-40"
                        >
                          {isEnhancingThis ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Sparkles className="w-3 h-3" />
                          )}
                          <span className="hidden sm:inline">Polish</span>
                        </button>
                        {exp.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAchievement(exp.id, idx)}
                            className="text-stone-400 hover:text-rose-600 mt-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => addAchievement(exp.id)}
                  className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Achievement</span>
                </button>
              </div>

              {/* Technologies Used */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Technologies Used (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, TypeScript, Node.js, PostgreSQL"
                  value={exp.technologiesUsed.join(', ')}
                  onChange={(e) =>
                    updateItem(
                      exp.id,
                      'technologiesUsed',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            id="btn-add-another-experience"
            onClick={addExperience}
            className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Another Work Experience</span>
          </button>
        </div>
      )}

      <StepNavigationButtons
        currentStep={5}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSkip={onSkip}
        isOptional={true}
        onSave={onSave}
      />
    </div>
  );
};
