import React from 'react';
import { STEP_CONFIG } from '../data/jobRoles';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  completedSteps: number[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  onSelectStep,
  completedSteps,
}) => {
  const currentConfig = STEP_CONFIG.find((s) => s.step === currentStep) || STEP_CONFIG[0];
  const progressPercent = Math.round((currentStep / STEP_CONFIG.length) * 100);

  return (
    <div className="bg-white border-b border-stone-200 px-4 py-3 sm:px-6 no-print">
      <div className="max-w-7xl mx-auto">
        {/* Top Info Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {currentStep}
              </span>
              <h1 className="text-base sm:text-lg font-bold text-stone-900">
                {currentConfig.title}
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-0.5 ml-8">
              {currentConfig.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-stone-500">
            <span>Step {currentStep} of {STEP_CONFIG.length}</span>
            <span className="font-semibold text-stone-800">({progressPercent}%)</span>
          </div>
        </div>

        {/* Continuous Linear Progress Bar */}
        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-3">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Horizontal Step Pills for direct navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
          {STEP_CONFIG.map((item) => {
            const isCurrent = item.step === currentStep;
            const isCompleted = completedSteps.includes(item.step);

            return (
              <button
                key={item.step}
                id={`step-tab-${item.step}`}
                onClick={() => onSelectStep(item.step)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md whitespace-nowrap transition-colors shrink-0 font-medium ${
                  isCurrent
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : isCompleted
                    ? 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                    : 'text-stone-500 hover:bg-stone-100 hover:text-stone-800'
                }`}
              >
                <span className="text-[10px] opacity-80">{item.step}.</span>
                <span>{item.short}</span>
                {isCompleted && !isCurrent && (
                  <Check className="w-3 h-3 text-emerald-600 ml-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
