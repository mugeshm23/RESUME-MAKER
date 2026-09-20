import React, { useState } from 'react';
import { FileText, CheckCircle2, LayoutDashboard, Sparkles, Printer, Download, Eye, Briefcase, RefreshCw } from 'lucide-react';
import { ATSAnalysisResult } from '../utils/atsChecker';

interface NavbarProps {
  resumeTitle: string;
  onUpdateTitle: (title: string) => void;
  currentStep: number;
  totalSteps: number;
  atsResult: ATSAnalysisResult;
  isSaving: boolean;
  onOpenDashboard: () => void;
  onOpenJobMatcher: () => void;
  onOpenScoreModal: () => void;
  onTogglePreview: () => void;
  isPreviewOpen: boolean;
  onPrint: () => void;
  onDownloadPdf: () => void;
  isExportingPdf: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  resumeTitle,
  onUpdateTitle,
  currentStep,
  totalSteps,
  atsResult,
  isSaving,
  onOpenDashboard,
  onOpenJobMatcher,
  onOpenScoreModal,
  onTogglePreview,
  isPreviewOpen,
  onPrint,
  onDownloadPdf,
  isExportingPdf,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(resumeTitle);

  const handleTitleSubmit = () => {
    if (tempTitle.trim()) {
      onUpdateTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Dashboard Link */}
        <div className="flex items-center gap-3">
          <button
            id="nav-dashboard-btn"
            onClick={onOpenDashboard}
            className="flex items-center gap-2 text-stone-700 hover:text-stone-950 font-semibold px-2.5 py-1.5 rounded-md hover:bg-stone-100 transition-colors text-sm"
            title="View All Saved Resumes"
          >
            <LayoutDashboard className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline">My Resumes</span>
          </button>

          <div className="h-5 w-px bg-stone-200 hidden sm:block" />

          {/* Editable Resume Title */}
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600 hidden sm:block" />
            {isEditingTitle ? (
              <input
                id="nav-resume-title-input"
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                autoFocus
                className="font-medium text-sm text-stone-900 border border-blue-400 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <button
                id="nav-edit-title-btn"
                onClick={() => {
                  setTempTitle(resumeTitle);
                  setIsEditingTitle(true);
                }}
                className="font-semibold text-sm text-stone-900 hover:text-blue-700 hover:underline max-w-[180px] sm:max-w-[260px] truncate text-left"
                title="Click to rename resume"
              >
                {resumeTitle || 'Untitled Resume'}
              </button>
            )}

            {/* Auto-save Status */}
            <div className="flex items-center gap-1 text-[11px] text-stone-500 ml-1">
              {isSaving ? (
                <span className="flex items-center gap-1 text-stone-400">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span className="hidden md:inline">Saving...</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="hidden md:inline">Saved</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: ATS Score indicator */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            id="nav-ats-score-btn"
            onClick={onOpenScoreModal}
            className="flex items-center gap-2 px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded-full text-xs font-medium text-stone-800 transition-colors border border-stone-200"
            title="Click to view ATS Score and actionable suggestions"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>ATS Score:</span>
            <span className="font-bold text-stone-950">{atsResult.totalScore}%</span>
            <span className="text-stone-400 text-[10px]">| Review</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Job description matcher */}
          <button
            id="nav-job-matcher-btn"
            onClick={onOpenJobMatcher}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md border border-stone-200 transition-colors"
            title="Compare with a Job Description"
          >
            <Briefcase className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden md:inline">Match Job Description</span>
          </button>

          {/* Toggle Live Preview */}
          <button
            id="nav-toggle-preview-btn"
            onClick={onTogglePreview}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors border ${
              isPreviewOpen
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'text-stone-700 hover:bg-stone-100 border-stone-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPreviewOpen ? 'Hide Preview' : 'Preview'}</span>
          </button>

          {/* Quick Print */}
          <button
            id="nav-quick-print-btn"
            onClick={onPrint}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md border border-stone-200 text-xs font-medium flex items-center gap-1"
            title="Print Resume (Browser Print)"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Quick Download PDF */}
          <button
            id="nav-download-pdf-btn"
            onClick={onDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 active:bg-black text-white rounded-md text-xs font-medium transition-all shadow-xs disabled:opacity-50"
          >
            {isExportingPdf ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
