import React from 'react';
import { ExtracurricularItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Compass, Plus, Trash2 } from 'lucide-react';

interface Step11Props {
  activities: ExtracurricularItem[];
  onChange: (activities: ExtracurricularItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step11Extracurricular: React.FC<Step11Props> = ({
  activities,
  onChange,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const addActivity = () => {
    const newItem: ExtracurricularItem = {
      id: 'extra_' + Date.now(),
      activity: '',
      organization: '',
      role: '',
      duration: '',
      description: '',
    };
    onChange([...activities, newItem]);
  };


  const updateItem = (id: string, field: keyof ExtracurricularItem, value: any) => {
    onChange(
      activities.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(activities.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Extracurricular Activities & Clubs (Optional)</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Student tech clubs, open source circles, robotics teams, debate, or volunteering demonstrate team collaboration and initiative.
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={item.id}
            className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Activity #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Club / Activity Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Developer Student Club / Open Source Society"
                  value={item.activity}
                  onChange={(e) => updateItem(item.id, 'activity', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Duration / Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2023 - 2024"
                  value={item.duration}
                  onChange={(e) => updateItem(item.id, 'duration', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Role / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Core Technical Member / Event Organizer"
                  value={item.role || ''}
                  onChange={(e) => updateItem(item.id, 'role', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Key Contribution / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mentored 40+ students in git fundamentals and web development"
                  value={item.description || ''}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          id="btn-add-activity"
          onClick={addActivity}
          className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Extracurricular Activity</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={11}
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
