import React from 'react';
import { CertificationItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Award, Plus, Trash2, ExternalLink } from 'lucide-react';

interface Step8Props {
  certifications: CertificationItem[];
  onChange: (certifications: CertificationItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step8Certifications: React.FC<Step8Props> = ({
  certifications,
  onChange,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const addCertification = () => {
    const newItem: CertificationItem = {
      id: 'cert_' + Date.now(),
      name: '',
      issuingOrg: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: '',
      skillsLearned: [],
    };

    onChange([...certifications, newItem]);
  };

  const updateItem = (id: string, field: keyof CertificationItem, value: any) => {
    onChange(
      certifications.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(certifications.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Add your professional licenses and certifications.</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Include certificates from accredited institutions, cloud providers (AWS, GCP, Azure), Coursera, freeCodeCamp, or HackerRank.
        </p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div
            key={cert.id}
            className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Certification #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(cert.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Certificate Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. AWS Certified Cloud Practitioner"
                  value={cert.name}
                  onChange={(e) => updateItem(cert.id, 'name', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Issuing Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amazon Web Services / Coursera"
                  value={cert.issuingOrg}
                  onChange={(e) => updateItem(cert.id, 'issuingOrg', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Issue Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. May 2024"
                  value={cert.issueDate}
                  onChange={(e) => updateItem(cert.id, 'issueDate', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Credential ID (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. CERT-98741"
                  value={cert.credentialId || ''}
                  onChange={(e) => updateItem(cert.id, 'credentialId', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                  <span>Verification URL (optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={cert.credentialUrl || ''}
                  onChange={(e) => updateItem(cert.id, 'credentialUrl', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          id="btn-add-certification"
          onClick={addCertification}
          className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Certification</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={8}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSkip={onSkip}
        isOptional={true}
        onSave={onSave}
      />
    </div>
  );
};
