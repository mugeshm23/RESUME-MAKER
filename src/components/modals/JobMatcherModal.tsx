import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { X, Briefcase, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface JobMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
}

interface MatchResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
}

export const JobMatcherModal: React.FC<JobMatcherModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState(data.careerInfo.targetRole || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai/match-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          targetRole,
          resumeData: data,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setResult(json);
      }
    } catch (err) {
      console.error('Failed to match keywords:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900">Job Description Keyword Matcher</h3>
              <p className="text-xs text-stone-500">
                Compare your resume against a specific job posting to check keyword density and missing skills.
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
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Target Role input */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Target Role Title
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Associate Software Engineer / Frontend Developer"
              className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Description Textarea */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
              Paste the Job Description / Requirements
            </label>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the requirements, responsibilities, and required qualifications from LinkedIn, Indeed, or the company careers page..."
              className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
            />
          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !jobDescription.trim()}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Comparing with Gemini ATS Engine...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Keyword & Skills Match</span>
              </>
            )}
          </button>

          {/* Results Display */}
          {result && (
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-5">
              {/* Score Header */}
              <div className="flex items-center justify-between bg-purple-50/70 border border-purple-100 rounded-xl p-4">
                <div>
                  <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                    Role Match Score
                  </span>
                  <div className="text-2xl font-extrabold text-purple-950 mt-0.5">
                    {result.matchScore}%
                  </div>
                </div>
                <div className="text-right text-xs text-purple-800">
                  <p>{result.matchedKeywords.length} matching keywords</p>
                  <p className="text-rose-600 font-semibold">{result.missingKeywords.length} missing keywords</p>
                </div>
              </div>

              {/* Matched Keywords */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Found in your Resume ({result.matchedKeywords.length})</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full border border-emerald-200"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Missing Skills & Keywords ({result.missingKeywords.length})</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-amber-50 text-amber-900 text-xs font-medium rounded-full border border-amber-200"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-stone-500 mt-1.5">
                  <strong>Advice:</strong> If you have experience with any of these missing skills, add them in the Skills or Projects sections to increase your ATS match.
                </p>
              </div>

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide mb-2">
                    Targeted Action Plan
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
