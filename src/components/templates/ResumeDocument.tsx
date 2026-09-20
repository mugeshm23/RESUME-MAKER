import React from 'react';
import { ResumeData, ColorTheme, TemplateId } from '../../types';
import { ClassicTemplate } from './ClassicTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { TechnicalTemplate } from './TechnicalTemplate';

interface ResumeDocumentProps {
  data: ResumeData;
  scale?: number;
  className?: string;
  id?: string;
}

const COLOR_MAP: Record<ColorTheme, string> = {
  monochrome: '#1c1917',
  navy: '#1e3a8a',
  slate: '#334155',
  emerald: '#065f46',
  burgundy: '#831843',
};

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data,
  scale = 1,
  className = '',
  id = 'resume-document-container',
}) => {
  const template = data.preferences.template || 'classic';
  const colorTheme = data.preferences.colorTheme || 'monochrome';
  const accentColor = COLOR_MAP[colorTheme] || '#1c1917';
  const isA4 = data.preferences.pageSize === 'a4';

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case 'minimal':
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case 'professional':
        return <ProfessionalTemplate data={data} accentColor={accentColor} />;
      case 'technical':
        return <TechnicalTemplate data={data} accentColor={accentColor} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div
      id={id}
      className={`bg-white text-stone-900 shadow-sm border border-stone-200 transition-all mx-auto print:border-0 print:shadow-none print:m-0 print:p-0 ${className}`}
      style={{
        width: isA4 ? '210mm' : '8.5in',
        minHeight: isA4 ? '297mm' : '11in',
        padding: '18mm 16mm',
        boxSizing: 'border-box',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center',
      }}
    >
      {renderTemplate()}
    </div>
  );
};
