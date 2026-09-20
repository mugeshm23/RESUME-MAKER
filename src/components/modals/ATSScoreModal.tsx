import React from 'react';
import { ATSAnalysisResult } from '../../utils/atsChecker';
import { X, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ATSScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ATSAnalysisResult;
}

export const ATSScoreModal: React.FC<ATSScoreModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900">ATS Compliance & Score Breakdown</h3>
              <p className="text-xs text-stone-500">
                Transparent rules based on Applicant Tracking System parsing heuristics.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Total Score Meter */}
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                Total ATS Safe Score
              </span>
              <div className="text-3xl font-extrabold text-stone-900 mt-0.5">
                {result.totalScore}%
              </div>
            </div>
            <div className="text-right text-xs text-stone-600">
              <p>Word Count: <span className="font-bold text-stone-900">{result.wordCount} words</span></p>
              <p>Page Count: <span className="font-bold text-stone-900">{result.estimatedPageCount} Page(s)</span></p>
            </div>
          </div>

          {/* Category Breakdown list */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
              Scoring Weights by Category
            </h4>
            <div className="space-y-2">
              {result.breakdown.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-stone-50/70 border border-stone-200 rounded-lg text-xs">
                  <div>
                    <p className="font-semibold text-stone-900">{item.category}</p>
                    <p className="text-[11px] text-stone-500">{item.feedback}</p>
                  </div>
                  <span className="font-mono font-bold text-stone-900 ml-3">
                    {item.score} / {item.maxScore}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Suggestions */}
          <div>
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Recommended Checklist</span>
            </h4>
            {result.suggestions.length > 0 ? (
              <div className="space-y-1.5">
                {result.suggestions.map((sug, i) => (
                  <div key={i} className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>All core ATS recommendations are satisfied!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
