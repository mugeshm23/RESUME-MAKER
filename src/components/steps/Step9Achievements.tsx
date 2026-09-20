import React from 'react';
import { AchievementItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Trophy, Plus, Trash2 } from 'lucide-react';

interface Step9Props {
  achievements: AchievementItem[];
  onChange: (achievements: AchievementItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step9Achievements: React.FC<Step9Props> = ({
  achievements,
  onChange,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const addAchievement = () => {
    const newItem: AchievementItem = {
      id: 'ach_' + Date.now(),
      title: '',
      organization: '',
      date: '',
      description: '',
    };
    onChange([...achievements, newItem]);
  };

  const updateItem = (id: string, field: keyof AchievementItem, value: any) => {
    onChange(
      achievements.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(achievements.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Add your honors, awards, and achievements.</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Hackathons, coding contests, academic ranks, scholarships, and technical paper prizes prove you excel under pressure.
        </p>
      </div>

      <div className="space-y-4">
        {achievements.map((ach, index) => (
          <div
            key={ach.id}
            className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Achievement #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(ach.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Achievement / Award Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1st Place - Smart India Hackathon 2024"
                  value={ach.title}
                  onChange={(e) => updateItem(ach.id, 'title', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oct 2024"
                  value={ach.date}
                  onChange={(e) => updateItem(ach.id, 'date', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Host Organization / Contest
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ministry of Education / College Tech Fest"
                  value={ach.organization || ''}
                  onChange={(e) => updateItem(ach.id, 'organization', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Description / Highlight
                </label>
                <input
                  type="text"
                  placeholder="e.g. Selected out of 500+ teams nationwide for creating an IoT energy monitor"
                  value={ach.description || ''}
                  onChange={(e) => updateItem(ach.id, 'description', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          id="btn-add-achievement"
          onClick={addAchievement}
          className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Achievement</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={9}
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
