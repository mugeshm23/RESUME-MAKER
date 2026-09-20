import React, { useState } from 'react';
import { ResumeData } from '../types';
import { ResumeDocument } from './templates/ResumeDocument';
import { X, ZoomIn, ZoomOut, Download, Printer } from 'lucide-react';

interface LivePreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onDownloadPdf: () => void;
  onPrint: () => void;
}

export const LivePreviewDrawer: React.FC<LivePreviewDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onDownloadPdf,
  onPrint,
}) => {
  const [scale, setScale] = useState(0.55);

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-40 w-full md:w-[580px] lg:w-[680px] bg-stone-100 border-l border-stone-300 shadow-2xl flex flex-col no-print">
      {/* Drawer Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div>
          <h3 className="font-bold text-sm text-stone-900">Live Resume Preview</h3>
          <p className="text-[11px] text-stone-500">
            Template: <span className="capitalize font-medium text-stone-700">{data.preferences.template}</span> ({data.preferences.pageSize.toUpperCase()})
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.35, s - 0.05))}
            className="p-1 hover:bg-stone-100 rounded text-stone-600"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono text-stone-600 w-8 text-center">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(0.9, s + 0.05))}
            className="p-1 hover:bg-stone-100 rounded text-stone-600"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-stone-200 mx-1" />

          <button
            type="button"
            onClick={onPrint}
            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scaled Preview Canvas */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }} className="mb-20">
          <ResumeDocument data={data} id="live-preview-drawer-document" />
        </div>
      </div>
    </aside>
  );
};
