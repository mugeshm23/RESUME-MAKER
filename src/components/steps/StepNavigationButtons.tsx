import React from 'react';
import { ArrowLeft, ArrowRight, Save, SkipForward } from 'lucide-react';

interface StepNavProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSkip?: () => void;
  onSave?: () => void;
  isOptional?: boolean;
  canContinue?: boolean;
  nextLabel?: string;
}

export const StepNavigationButtons: React.FC<StepNavProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSkip,
  onSave,
  isOptional = false,
  canContinue = true,
  nextLabel,
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 mt-8 border-t border-stone-200">
      {/* Left: Back */}
      <div className="w-full sm:w-auto">
        {currentStep > 1 ? (
          <button
            type="button"
            id="step-back-btn"
            onClick={onBack}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Center & Right: Actions */}
      <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
        {onSave && (
          <button
            type="button"
            id="step-save-btn"
            onClick={onSave}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4 text-stone-500" />
            <span className="hidden sm:inline">Save Progress</span>
          </button>
        )}

        {isOptional && onSkip && (
          <button
            type="button"
            id="step-skip-btn"
            onClick={onSkip}
            className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            <span>Skip this step</span>
          </button>
        )}

        <button
          type="button"
          id="step-continue-btn"
          onClick={onNext}
          disabled={!canContinue}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors"
        >
          <span>{nextLabel || (currentStep === totalSteps ? 'Generate Resume' : 'Continue')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
