import React, { useState } from 'react';
import { CareerInfo, TechnicalSkills } from '../../types';
import { TARGET_JOB_ROLES } from '../../data/jobRoles';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Briefcase, Sparkles, Wand2, RefreshCw } from 'lucide-react';

interface Step2Props {
  data: CareerInfo;
  skills: TechnicalSkills;
  onChange: (data: CareerInfo) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

export const Step2Career: React.FC<Step2Props> = ({
  data,
  skills,
  onChange,
  onNext,
  onBack,
  onSave,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  const updateField = (field: keyof CareerInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleAiEnhanceSummary = async () => {
    setIsEnhancing(true);
    setAiMessage(null);
    try {
      const topSkills = [
        ...skills.programmingLanguages,
        ...skills.frontend,
        ...skills.backend,
        ...skills.databases,
      ].slice(0, 6);

      const res = await fetch('/api/ai/enhance-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawSummary: data.professionalSummary || data.careerObjective,
          targetRole: data.targetRole,
          yearsOfExp: data.yearsOfExperience,
          skills: topSkills,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.enhancedSummary) {
          updateField('professionalSummary', result.enhancedSummary);
          setAiMessage(result.aiGenerated ? 'Summary refined with AI using only your provided data.' : 'Summary polished with active verbs.');
        }
      }
    } catch (err) {
      console.error('Failed to enhance summary:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">What type of job are you looking for?</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Aligning your target role and summary helps recruiters quickly identify how you fit their open positions.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-5">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <span>Career Goals & Summary</span>
        </h2>

        {/* Target Job Role */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
            Target Job Role <span className="text-rose-500">*</span>
          </label>
          <input
            id="input-target-role"
            type="text"
            placeholder="e.g. Software Engineer / Frontend Developer"
            value={data.targetRole}
            onChange={(e) => updateField('targetRole', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Quick Select Role Chips */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-xs text-stone-500 py-0.5">Suggestions:</span>
            {TARGET_JOB_ROLES.slice(0, 7).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => updateField('targetRole', role)}
                className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                  data.targetRole === role
                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-medium'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Experience & Employment Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Years of Experience
            </label>
            <select
              id="select-years-exp"
              value={data.yearsOfExperience}
              onChange={(e) => updateField('yearsOfExperience', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0 (Fresher / Student)">0 (Fresher / Student)</option>
              <option value="0 - 1 Year">0 - 1 Year</option>
              <option value="1 - 3 Years">1 - 3 Years</option>
              <option value="3 - 5 Years">3 - 5 Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Preferred Job Type
            </label>
            <select
              id="select-job-type"
              value={data.preferredJobType}
              onChange={(e) => updateField('preferredJobType', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract / Freelance">Contract / Freelance</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Preferred Location
            </label>
            <input
              id="input-pref-location"
              type="text"
              placeholder="e.g. Bengaluru / Hybrid / Remote"
              value={data.preferredLocation}
              onChange={(e) => updateField('preferredLocation', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Professional Summary Textarea with AI Enhancer */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
              Professional Summary / Bio
            </label>
            <button
              type="button"
              id="btn-ai-enhance-summary"
              onClick={handleAiEnhanceSummary}
              disabled={isEnhancing}
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1 rounded-md transition-colors disabled:opacity-50"
              title="Refine wording based on your entered details without fabricating facts"
            >
              {isEnhancing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Refining with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Polish Summary</span>
                </>
              )}
            </button>
          </div>

          <textarea
            id="textarea-summary"
            rows={4}
            placeholder="Write 2-4 sentences describing your technical background, core skills, and enthusiasm for software engineering..."
            value={data.professionalSummary}
            onChange={(e) => updateField('professionalSummary', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          />

          {aiMessage && (
            <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
              ✓ {aiMessage}
            </p>
          )}

          <p className="text-[11px] text-stone-500 mt-1">
            <strong>Rule:</strong> AI assistance polishes tone and grammar based strictly on your information. It will never fabricate years of experience or qualifications.
          </p>
        </div>

        {/* Career Objective (Optional alternative for freshers) */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
            Career Objective <span className="text-stone-400 lowercase font-normal">(optional specific goal)</span>
          </label>
          <input
            id="input-career-objective"
            type="text"
            placeholder="e.g. To secure a challenging software engineering role where I can apply my Java and React skills to build scalable products."
            value={data.careerObjective}
            onChange={(e) => updateField('careerObjective', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <StepNavigationButtons
        currentStep={2}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSave={onSave}
      />
    </div>
  );
};
