import React from 'react';
import { ResponsibilityItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { ShieldCheck, Plus, Trash2 } from 'lucide-react';

interface Step12Props {
  positions: ResponsibilityItem[];
  onChange: (positions: ResponsibilityItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step12Positions: React.FC<Step12Props> = ({
  positions,
  onChange,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const addPosition = () => {
    const newItem: ResponsibilityItem = {
      id: 'pos_' + Date.now(),
      position: '',
      organization: '',
      duration: '',
      responsibilities: [''],
      achievements: [],
    };
    onChange([...positions, newItem]);
  };

  const updateItem = (id: string, field: keyof ResponsibilityItem, value: any) => {
    onChange(
      positions.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };


  const removeItem = (id: string) => {
    onChange(positions.filter((item) => item.id !== id));
  };

  const addResp = (id: string) => {
    onChange(
      positions.map((item) =>
        item.id === id
          ? { ...item, responsibilities: [...item.responsibilities, ''] }
          : item
      )
    );
  };

  const updateResp = (id: string, idx: number, val: string) => {
    onChange(
      positions.map((item) => {
        if (item.id !== id) return item;
        const copy = [...item.responsibilities];
        copy[idx] = val;
        return { ...item, responsibilities: copy };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Positions of Responsibility & Leadership (Optional)</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Roles such as Student Placement Coordinator, Technical Club President, or Department Representative demonstrate management skills.
        </p>
      </div>

      <div className="space-y-4">
        {positions.map((pos, index) => (
          <div
            key={pos.id}
            className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Leadership Role #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(pos.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Position / Role <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Student Placement Coordinator"
                  value={pos.position}
                  onChange={(e) => updateItem(pos.id, 'position', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  College / Organization <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. VSB Engineering College"
                  value={pos.organization}
                  onChange={(e) => updateItem(pos.id, 'organization', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Tenure / Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2023 - 2024"
                  value={pos.duration}
                  onChange={(e) => updateItem(pos.id, 'duration', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1.5">
                Key Responsibilities & Deliverables
              </label>
              <div className="space-y-1.5">
                {pos.responsibilities.map((r: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-stone-400 font-mono text-xs">•</span>
                    <input
                      type="text"
                      placeholder="e.g. Coordinated recruitment drives for 15+ visiting companies"
                      value={r}
                      onChange={(e) => updateResp(pos.id, i, e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addResp(pos.id)}
                className="mt-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Bullet Point</span>
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          id="btn-add-position"
          onClick={addPosition}
          className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Position of Responsibility</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={12}
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
