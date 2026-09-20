import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { ResumeDocument } from '../templates/ResumeDocument';
import { ATSAnalysisResult } from '../../utils/atsChecker';
import { Download, Printer, Copy, Check, Sparkles, Briefcase, FileText, ArrowLeft, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface Step17Props {
  data: ResumeData;
  atsResult: ATSAnalysisResult;
  onBackToEdit: (step?: number) => void;
  onOpenJobMatcher: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  isExportingPdf: boolean;
}

export const Step17Generate: React.FC<Step17Props> = ({
  data,
  atsResult,
  onBackToEdit,
  onOpenJobMatcher,
  onDownloadPdf,
  onPrint,
  isExportingPdf,
}) => {
  const [zoom, setZoom] = useState(0.85);
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    // Generate clean text representation of resume
    const textLines = [
      data.personalInfo.fullName.toUpperCase(),
      data.personalInfo.professionalTitle,
      [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.city].filter(Boolean).join(' | '),
      data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin}` : '',
      data.personalInfo.github ? `GitHub: ${data.personalInfo.github}` : '',
      '\n--- PROFESSIONAL SUMMARY ---',
      data.careerInfo.professionalSummary,
      '\n--- EDUCATION ---',
      ...data.education.map(
        (e) => `${e.degree} in ${e.specialization} - ${e.institution} (${e.startYear}-${e.endYear})`
      ),
      '\n--- TECHNICAL SKILLS ---',
      `Languages: ${data.skills.programmingLanguages.join(', ')}`,
      `Frontend: ${data.skills.frontend.join(', ')}`,
      `Backend: ${data.skills.backend.join(', ')}`,
      `Databases: ${data.skills.databases.join(', ')}`,
      `Tools: ${[...data.skills.tools, ...data.skills.devops].join(', ')}`,
      '\n--- PROJECTS ---',
      ...data.projects.map(
        (p) => `${p.name} [${p.technologiesUsed.join(', ')}]\n${p.description}\n${(p.keyFeatures || []).map((k) => `• ${k}`).join('\n')}`
      ),
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(textLines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Buttons */}
      <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                ✓
              </span>
              <h2 className="text-lg font-bold text-stone-900">Your Resume is Ready!</h2>
            </div>
            <p className="text-xs text-stone-500 mt-1 ml-8">
              Formatted according to modern ATS standards with high contrast and machine-readable text.
            </p>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              id="generate-download-pdf-btn"
              onClick={onDownloadPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors disabled:opacity-50"
            >
              {isExportingPdf ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="generate-print-btn"
              onClick={onPrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-sm font-semibold rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onOpenJobMatcher}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-sm font-semibold rounded-lg transition-colors"
            >
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>Match Job Description</span>
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-medium rounded-lg hover:bg-stone-100 transition-colors"
              title="Copy plain text content"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              onClick={() => onBackToEdit(1)}
              className="flex items-center gap-1.5 px-3 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-medium rounded-lg hover:bg-stone-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edit Details</span>
            </button>
          </div>
        </div>

        {/* ATS Score pill & Zoom bar */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>ATS Score: <strong className="text-stone-900">{atsResult.totalScore}%</strong></span>
            </span>
            <span>•</span>
            <span>Template: <strong className="text-stone-900 capitalize">{data.preferences.template}</strong></span>
            <span>•</span>
            <span>Color: <strong className="text-stone-900 capitalize">{data.preferences.colorTheme}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500">Zoom:</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="p-1 hover:bg-stone-100 rounded text-stone-600"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.2, z + 0.1))}
              className="p-1 hover:bg-stone-100 rounded text-stone-600"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.85)}
              className="text-[11px] text-blue-600 hover:underline ml-1"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Rendered Live Document Container */}
      <div className="overflow-x-auto bg-stone-100/80 p-4 sm:p-8 rounded-2xl border border-stone-200 flex justify-center">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
          <ResumeDocument data={data} id="resume-document-container" />
        </div>
      </div>
    </div>
  );
};
