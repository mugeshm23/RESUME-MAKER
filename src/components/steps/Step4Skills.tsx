import React, { useState } from 'react';
import { TechnicalSkills } from '../../types';
import { SKILL_CATEGORIES, POPULAR_SOFT_SKILLS } from '../../data/jobRoles';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Code2, Plus, X, Sparkles } from 'lucide-react';

interface Step4Props {
  skills: TechnicalSkills;
  softSkills: string[];
  onChangeSkills: (skills: TechnicalSkills) => void;
  onChangeSoftSkills: (softSkills: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

export const Step4Skills: React.FC<Step4Props> = ({
  skills,
  softSkills,
  onChangeSkills,
  onChangeSoftSkills,
  onNext,
  onBack,
  onSave,
}) => {
  const [newInputs, setNewInputs] = useState<Record<string, string>>({});
  const [newSoftInput, setNewSoftInput] = useState('');

  const handleAddSkill = (categoryKey: keyof TechnicalSkills) => {
    const raw = (newInputs[categoryKey] || '').trim();
    if (!raw) return;

    // Split by comma if user entered multiple skills
    const items = raw.split(',').map((s) => s.trim()).filter(Boolean);
    const existing = skills[categoryKey] || [];
    const unique = [...new Set([...existing, ...items])];

    onChangeSkills({
      ...skills,
      [categoryKey]: unique,
    });

    setNewInputs((prev) => ({ ...prev, [categoryKey]: '' }));
  };

  const handleRemoveSkill = (categoryKey: keyof TechnicalSkills, skillToRemove: string) => {
    onChangeSkills({
      ...skills,
      [categoryKey]: (skills[categoryKey] || []).filter((s) => s !== skillToRemove),
    });
  };

  const handleAddSoftSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || softSkills.includes(trimmed)) return;
    onChangeSoftSkills([...softSkills, trimmed]);
    setNewSoftInput('');
  };

  const handleRemoveSoftSkill = (skillToRemove: string) => {
    onChangeSoftSkills(softSkills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">What technical and soft skills do you have?</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Group your skills by category (e.g. Programming, Frontend, Tools). You can type multiple comma-separated items (e.g. <code>Java, Python, C++</code>) and press Enter.
        </p>
      </div>

      {/* Technical Skills Cards */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-6">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Code2 className="w-5 h-5 text-blue-600" />
          <span>Technical Skills by Category</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SKILL_CATEGORIES.map((cat) => {
            const currentList = skills[cat.key as keyof TechnicalSkills] || [];
            const inputValue = newInputs[cat.key] || '';

            return (
              <div
                key={cat.key}
                className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 hover:bg-white transition-colors"
              >
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1.5">
                  {cat.label}
                </label>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-2.5 min-h-[28px]">
                  {currentList.length > 0 ? (
                    currentList.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white text-stone-800 border border-stone-300 shadow-2xs"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(cat.key as keyof TechnicalSkills, skill)}
                          className="text-stone-400 hover:text-rose-600 ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-stone-400 italic">No skills added yet</span>
                  )}
                </div>

                {/* Input + Add button */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder={`e.g. ${cat.placeholder}`}
                    value={inputValue}
                    onChange={(e) =>
                      setNewInputs((prev) => ({ ...prev, [cat.key]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(cat.key as keyof TechnicalSkills);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(cat.key as keyof TechnicalSkills)}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Soft Skills Section */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Soft Skills & Professional Attributes (Optional)</span>
        </h2>

        {/* Selected Soft Skills */}
        <div className="flex flex-wrap gap-1.5 min-h-[32px]">
          {softSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSoftSkill(skill)}
                className="text-amber-500 hover:text-amber-800 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Popular Suggestions */}
        <div>
          <p className="text-xs font-semibold text-stone-500 mb-1.5">Click to add popular soft skills:</p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_SOFT_SKILLS.filter((s) => !softSkills.includes(s)).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSoftSkill(skill)}
                className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full transition-colors flex items-center gap-1 border border-stone-200"
              >
                <Plus className="w-3 h-3 text-stone-500" />
                <span>{skill}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Soft Skill Input */}
        <div className="flex gap-2 max-w-md pt-2">
          <input
            type="text"
            placeholder="Or type a custom soft skill..."
            value={newSoftInput}
            onChange={(e) => setNewSoftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSoftSkill(newSoftInput);
              }
            }}
            className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => handleAddSoftSkill(newSoftInput)}
            className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-medium rounded-lg"
          >
            Add
          </button>
        </div>
      </div>

      <StepNavigationButtons
        currentStep={4}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSave={onSave}
      />
    </div>
  );
};
