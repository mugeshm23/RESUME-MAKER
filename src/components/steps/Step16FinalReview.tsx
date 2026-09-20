import React from 'react';
import { ResumeData } from '../../types';
import { ATSAnalysisResult } from '../../utils/atsChecker';
import { StepNavigationButtons } from './StepNavigationButtons';
import { CheckCircle, AlertTriangle, Edit3, ShieldAlert, Sparkles, User, GraduationCap, Code2, FolderGit2, Briefcase } from 'lucide-react';

interface Step16Props {
  data: ResumeData;
  atsResult: ATSAnalysisResult;
  onGoToStep: (step: number) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

export const Step16FinalReview: React.FC<Step16Props> = ({
  data,
  atsResult,
  onGoToStep,
  onNext,
  onBack,
  onSave,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Review all your information before generating your resume.</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Take a moment to verify details and fix any missing items identified by our ATS scoring engine.
        </p>
      </div>

      {/* ATS Health Summary Banner */}
      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
              Resume Readiness & ATS Score
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-extrabold text-stone-900">{atsResult.totalScore}%</span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  atsResult.totalScore >= 80
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : atsResult.totalScore >= 60
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {atsResult.totalScore >= 80 ? 'ATS Safe & Interview Ready' : 'Good Progress — Needs Polish'}
              </span>
            </div>
          </div>

          <div className="text-xs text-stone-600 space-y-1">
            <p>Word Count: <strong className="text-stone-900">{atsResult.wordCount} words</strong></p>
            <p>Estimated Length: <strong className="text-stone-900">{atsResult.estimatedPageCount} Page(s)</strong></p>
          </div>
        </div>

        {/* Suggestions / Checklist */}
        {atsResult.suggestions.length > 0 ? (
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Recommended Improvements</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {atsResult.suggestions.map((sug, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/70 text-xs text-amber-950"
                >
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Excellent work! All ATS requirements and core sections are thoroughly filled.</span>
          </div>
        )}
      </div>

      {/* Structured Sections Overview Cards */}
      <div className="space-y-3">
        {/* 1. Personal & Contact */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-stone-900">Personal Information</h3>
            </div>
            <p className="text-xs text-stone-600 ml-6">
              {data.personalInfo.fullName} • {data.personalInfo.email} • {data.personalInfo.phone}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(1)}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* 2. Career Objective / Summary */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-stone-900">Career Goals & Summary</h3>
            </div>
            <p className="text-xs text-stone-600 ml-6 truncate max-w-lg">
              {data.careerInfo.targetRole} — {data.careerInfo.professionalSummary || 'No summary provided'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(2)}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* 3. Education */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-stone-900">Education ({data.education.length})</h3>
            </div>
            <p className="text-xs text-stone-600 ml-6">
              {data.education.map((e) => `${e.degree} at ${e.institution}`).join(' • ') || 'None added'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(3)}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* 4. Skills */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-stone-900">Technical Skills</h3>
            </div>
            <p className="text-xs text-stone-600 ml-6">
              {[
                ...data.skills.programmingLanguages,
                ...data.skills.frontend,
                ...data.skills.backend,
              ].slice(0, 8).join(', ') || 'None added'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(4)}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        {/* 5. Projects */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-stone-900">Technical Projects ({data.projects.length})</h3>
            </div>
            <p className="text-xs text-stone-600 ml-6">
              {data.projects.map((p) => p.name).join(' • ') || 'No projects added'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onGoToStep(7)}
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      <StepNavigationButtons
        currentStep={16}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSave={onSave}
        nextLabel="Proceed to Generate Resume →"
      />
    </div>
  );
};
