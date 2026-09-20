import React from 'react';
import { ReferenceItem, ResumePreferences } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Users, Plus, Trash2 } from 'lucide-react';

interface Step14Props {
  references: ReferenceItem[];
  preferences: ResumePreferences;
  onChangeReferences: (references: ReferenceItem[]) => void;
  onChangePreferences: (preferences: ResumePreferences) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step14References: React.FC<Step14Props> = ({
  references,
  preferences,
  onChangeReferences,
  onChangePreferences,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const addReference = () => {
    const newItem: ReferenceItem = {
      id: 'ref_' + Date.now(),
      name: '',
      jobTitle: 'Professor & Head of Dept.',
      organization: '',
      email: '',
      phone: '',
      relationship: 'Academic Advisor / Professor',
    };
    onChangeReferences([...references, newItem]);
    if (!preferences.includeReferences) {
      onChangePreferences({ ...preferences, includeReferences: true });
    }
  };

  const updateItem = (id: string, field: keyof ReferenceItem, value: any) => {
    onChangeReferences(
      references.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChangeReferences(references.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">References (Optional)</p>
        <p className="text-blue-700 text-xs mt-0.5">
          In most technical resumes, references are provided upon request during the background verification round. You can add them here or leave this blank.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-stone-900">
            <input
              type="checkbox"
              checked={preferences.includeReferences}
              onChange={(e) =>
                onChangePreferences({ ...preferences, includeReferences: e.target.checked })
              }
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Include References section directly on the printed resume</span>
          </label>
        </div>

        {preferences.includeReferences && (
          <div className="space-y-4 pt-2">
            {references.map((ref, index) => (
              <div
                key={ref.id}
                className="bg-stone-50/70 border border-stone-200 rounded-xl p-4 space-y-3 relative"
              >
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                  <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Reference #{index + 1}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(ref.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. K. Ramesh"
                      value={ref.name}
                      onChange={(e) => updateItem(ref.id, 'name', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Designation & Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Professor & HOD, VSB Engineering College"
                      value={`${ref.jobTitle} - ${ref.organization}`}
                      onChange={(e) => {
                        const parts = e.target.value.split('-');
                        updateItem(ref.id, 'jobTitle', parts[0]?.trim() || '');
                        updateItem(ref.id, 'organization', parts[1]?.trim() || '');
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@college.edu"
                      value={ref.email}
                      onChange={(e) => updateItem(ref.id, 'email', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 00000"
                      value={ref.phone}
                      onChange={(e) => updateItem(ref.id, 'phone', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              id="btn-add-reference"
              onClick={addReference}
              className="w-full py-2.5 border border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-lg text-stone-700 hover:text-blue-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Reference</span>
            </button>
          </div>
        )}
      </div>

      <StepNavigationButtons
        currentStep={14}
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
