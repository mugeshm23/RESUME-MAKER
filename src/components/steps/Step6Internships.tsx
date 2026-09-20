import React, { useState } from 'react';
import { InternshipItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Building2, Plus, Trash2, Sparkles, RefreshCw } from 'lucide-react';

interface Step6Props {
  internships: InternshipItem[];
  onChange: (internships: InternshipItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step6Internships: React.FC<Step6Props> = ({
  internships,
  onChange,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const [enhancingKey, setEnhancingKey] = useState<string | null>(null);

  const addInternship = () => {
    const newItem: InternshipItem = {
      id: 'intern_' + Date.now(),
      internshipTitle: 'Software Engineering Intern',
      company: '',
      duration: '',
      location: '',
      isRemote: false,
      startDate: '',
      endDate: '',
      responsibilities: [''],
      achievements: [''],
      technologiesUsed: [],
      projectCompleted: '',
      certificateAvailable: false,
    };
    onChange([...internships, newItem]);
  };


  const updateItem = (id: string, field: keyof InternshipItem, value: any) => {
    onChange(
      internships.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(internships.filter((item) => item.id !== id));
  };

  const addResponsibility = (id: string) => {
    onChange(
      internships.map((item) =>
        item.id === id ? { ...item, responsibilities: [...item.responsibilities, ''] } : item
      )
    );
  };

  const updateResponsibility = (id: string, idx: number, val: string) => {
    onChange(
      internships.map((item) => {
        if (item.id !== id) return item;
        const copy = [...item.responsibilities];
        copy[idx] = val;
        return { ...item, responsibilities: copy };
      })
    );
  };

  const removeResponsibility = (id: string, idx: number) => {
    onChange(
      internships.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          responsibilities: item.responsibilities.filter((_, i) => i !== idx),
        };
      })
    );
  };

  const handleEnhanceBullet = async (id: string, idx: number, text: string, role: string) => {
    if (!text.trim()) return;
    const key = `${id}-${idx}`;
    setEnhancingKey(key);

    try {
      const res = await fetch('/api/ai/enhance-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputItem: text,
          contextType: 'Internship',
          roleOrTitle: role,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.bullet) {
          updateResponsibility(id, idx, data.bullet);
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
        <p className="font-semibold text-blue-950">Have you completed any internships?</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Internships are huge differentiators for freshers and early-career candidates. Show off the tools you used and the features you helped build.
        </p>
      </div>

      <div className="space-y-4">
        {internships.map((intern, index) => (
          <div
            key={intern.id}
            className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Internship #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(intern.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Internship Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Web Development Intern"
                  value={intern.internshipTitle}
                  onChange={(e) => updateItem(intern.id, 'internshipTitle', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Company / Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. SoftTech Solutions"
                  value={intern.company}
                  onChange={(e) => updateItem(intern.id, 'company', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Dates & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. May 2024"
                  value={intern.startDate}
                  onChange={(e) => updateItem(intern.id, 'startDate', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jul 2024"
                  value={intern.endDate}
                  onChange={(e) => updateItem(intern.id, 'endDate', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chennai / Remote"
                  value={intern.location}
                  onChange={(e) => updateItem(intern.id, 'location', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={intern.isRemote}
                    onChange={(e) => updateItem(intern.id, 'isRemote', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remote Internship</span>
                </label>
              </div>
            </div>

            {/* Responsibilities & Learning */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                  Responsibilities & Tasks Completed
                </label>
                <span className="text-[11px] text-stone-500">Add concise bullet points</span>
              </div>

              <div className="space-y-2">
                {intern.responsibilities.map((resp, idx) => {
                  const isEnhancingThis = enhancingKey === `${intern.id}-${idx}`;
                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-stone-400 mt-2 font-mono text-xs">•</span>
                      <input
                        type="text"
                        placeholder="e.g. Assisted senior developers in building reusable UI components in React"
                        value={resp}
                        onChange={(e) => updateResponsibility(intern.id, idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleEnhanceBullet(intern.id, idx, resp, intern.internshipTitle)
                        }
                        disabled={isEnhancingThis || !resp.trim()}
                        className="px-2.5 py-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md flex items-center gap-1 shrink-0 border border-blue-200 transition-colors disabled:opacity-40"
                      >
                        {isEnhancingThis ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        <span className="hidden sm:inline">Polish</span>
                      </button>
                      {intern.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeResponsibility(intern.id, idx)}
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
                onClick={() => addResponsibility(intern.id)}
                className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Task / Achievement</span>
              </button>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                Technologies / Frameworks Used (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. React, JavaScript, REST API, Git"
                value={intern.technologiesUsed.join(', ')}
                onChange={(e) =>
                  updateItem(
                    intern.id,
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
          id="btn-add-internship"
          onClick={addInternship}
          className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Internship</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={6}
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
