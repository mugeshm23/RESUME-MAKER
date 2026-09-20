import React from 'react';
import { ResumePreferences, TemplateId, ColorTheme } from '../../types';
import { TEMPLATE_OPTIONS, COLOR_THEMES } from '../../data/jobRoles';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Sliders, Check, Sparkles, Layout } from 'lucide-react';

interface Step15Props {
  preferences: ResumePreferences;
  onChange: (preferences: ResumePreferences) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

export const Step15Preferences: React.FC<Step15Props> = ({
  preferences,
  onChange,
  onNext,
  onBack,
  onSave,
}) => {
  const setTemplate = (template: TemplateId) => {
    onChange({ ...preferences, template });
  };

  const setColorTheme = (colorTheme: ColorTheme) => {
    onChange({ ...preferences, colorTheme });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Choose your resume design and layout preferences.</p>
        <p className="text-blue-700 text-xs mt-0.5">
          All templates are 100% ATS-compliant, single/multi-column balanced, and optimized for Applicant Tracking Systems.
        </p>
      </div>

      {/* Template Chooser */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Layout className="w-5 h-5 text-blue-600" />
          <span>Resume Template</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATE_OPTIONS.map((tmpl) => {
            const isSelected = preferences.template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                id={`template-card-${tmpl.id}`}
                onClick={() => setTemplate(tmpl.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-600/20 shadow-xs'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-stone-950">{tmpl.name}</h3>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-normal">{tmpl.description}</p>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
                  <span>✓ {tmpl.atsRating}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Sliders className="w-5 h-5 text-blue-600" />
          <span>Color Theme</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {COLOR_THEMES.map((c) => {
            const isSelected = preferences.colorTheme === c.id;
            return (
              <button
                key={c.id}
                id={`color-theme-${c.id}`}
                type="button"
                onClick={() => setColorTheme(c.id)}
                className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/30'
                    : 'border-stone-200 hover:border-stone-400 bg-white'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full border border-stone-300 shadow-2xs flex items-center justify-center text-white"
                  style={{ backgroundColor: c.color }}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
                <span className="text-xs font-semibold text-stone-800">{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Format & Length Settings */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-5">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span>Format & Audience Targeting</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Resume Persona
            </label>
            <select
              value={preferences.resumeType}
              onChange={(e) =>
                onChange({ ...preferences, resumeType: e.target.value as any })
              }
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fresher">Fresher / Student (Highlight Education & Projects)</option>
              <option value="experienced">Experienced (Highlight Work Experience)</option>
              <option value="technical">Technical Specialist</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Page Format
            </label>
            <select
              value={preferences.pageSize}
              onChange={(e) =>
                onChange({ ...preferences, pageSize: e.target.value as any })
              }
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="a4">A4 (Standard for India, Europe, Asia)</option>
              <option value="letter">US Letter (Standard for USA, Canada)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              ATS Compliance Optimization
            </label>
            <select
              value={preferences.atsOptimizedMode ? 'true' : 'false'}
              onChange={(e) =>
                onChange({ ...preferences, atsOptimizedMode: e.target.value === 'true' })
              }
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Strict ATS-Friendly Headers (Recommended)</option>
              <option value="false">Standard Styling</option>
            </select>
          </div>
        </div>

      </div>

      <StepNavigationButtons
        currentStep={15}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSave={onSave}
      />
    </div>
  );
};
