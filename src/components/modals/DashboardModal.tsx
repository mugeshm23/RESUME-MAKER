import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { X, Plus, Copy, Trash2, FileText, Download, Upload, Check, Clock } from 'lucide-react';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumes: ResumeData[];
  currentResumeId: string;
  onSelectResume: (resume: ResumeData) => void;
  onCreateNew: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onLoadSample: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  resumes,
  currentResumeId,
  onSelectResume,
  onCreateNew,
  onDuplicate,
  onDelete,
  onLoadSample,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resumes, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-resumes-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onSelectResume(parsed[0]);
          onClose();
        } else if (parsed && parsed.id) {
          onSelectResume(parsed);
          onClose();
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/50">
          <div>
            <h3 className="font-bold text-base text-stone-900">My Resumes</h3>
            <p className="text-xs text-stone-500">
              Manage your created resumes, duplicate versions for different job descriptions, or start a new draft.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Controls */}
        <div className="p-6 border-b border-stone-100 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="dashboard-new-resume-btn"
              onClick={() => {
                onCreateNew();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Resume</span>
            </button>

            <button
              type="button"
              id="dashboard-load-sample-btn"
              onClick={() => {
                onLoadSample();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium transition-colors"
            >
              <span>Load Sample Resume</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md border border-stone-200"
              title="Export all resumes as JSON backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <label className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md border border-stone-200 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Resume Cards List */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {resumes.map((res) => {
            const isCurrent = res.id === currentResumeId;
            return (
              <div
                key={res.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div
                  className="cursor-pointer flex-1"
                  onClick={() => {
                    onSelectResume(res);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <h4 className="font-bold text-sm text-stone-900 hover:underline">
                      {res.title || 'Untitled Resume'}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-500 mt-1">
                    {res.careerInfo.targetRole || 'No target role specified'} • {res.personalInfo.fullName || 'No name'}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-stone-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(res.updatedAt).toLocaleDateString()}</span>
                    </span>
                    <span>•</span>
                    <span className="capitalize">Template: {res.preferences.template}</span>
                    <span>•</span>
                    <span>{res.projects.length} Project(s)</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectResume(res);
                      onClose();
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md border border-stone-200 transition-colors"
                  >
                    Open
                  </button>

                  <button
                    type="button"
                    onClick={() => onDuplicate(res.id)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md border border-stone-200 transition-colors"
                    title="Duplicate as new version"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {resumes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (deleteConfirmId === res.id) {
                          onDelete(res.id);
                          setDeleteConfirmId(null);
                        } else {
                          setDeleteConfirmId(res.id);
                          setTimeout(() => setDeleteConfirmId(null), 3000);
                        }
                      }}
                      className={`p-1.5 rounded-md border transition-colors ${
                        deleteConfirmId === res.id
                          ? 'bg-rose-600 text-white border-rose-600 text-xs px-2'
                          : 'text-stone-400 hover:text-rose-600 hover:bg-rose-50 border-stone-200'
                      }`}
                      title="Delete Resume"
                    >
                      {deleteConfirmId === res.id ? 'Confirm?' : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
