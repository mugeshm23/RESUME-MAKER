import React from 'react';
import { LanguageItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { Languages, Plus, Trash2 } from 'lucide-react';

interface Step10Props {
  languages: LanguageItem[];
  onChange: (languages: LanguageItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

const COMMON_LANGUAGES = ['English', 'Tamil', 'Hindi', 'Spanish', 'French', 'German', 'Telugu', 'Kannada', 'Malayalam'];

export const Step10Languages: React.FC<Step10Props> = ({
  languages,
  onChange,
  onNext,
  onBack,
  onSave,
}) => {
  const addLanguage = (name = '') => {
    const newItem: LanguageItem = {
      id: 'lang_' + Date.now(),
      language: name,
      proficiency: 'Professional',
    };
    onChange([...languages, newItem]);
  };

  const updateItem = (id: string, field: keyof LanguageItem, value: any) => {
    onChange(
      languages.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(languages.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">What languages do you speak?</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Effective communication across regional and global teams is a great asset on any engineering resume.
        </p>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-5">
        <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Languages className="w-5 h-5 text-blue-600" />
          <span>Languages & Fluency</span>
        </h2>

        {/* Quick Add Suggestions */}
        <div className="flex flex-wrap items-center gap-1.5 pb-2">
          <span className="text-xs text-stone-500">Quick add:</span>
          {COMMON_LANGUAGES.filter((l) => !languages.some((item) => item.language.toLowerCase() === l.toLowerCase())).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => addLanguage(lang)}
              className="text-xs px-2.5 py-1 bg-stone-50 hover:bg-stone-100 text-stone-700 rounded-full border border-stone-200 transition-colors"
            >
              + {lang}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {languages.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-stone-50/70 p-3 rounded-lg border border-stone-200">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Language (e.g. English)"
                  value={item.language}
                  onChange={(e) => updateItem(item.id, 'language', e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-48">
                <select
                  value={item.proficiency}
                  onChange={(e) => updateItem(item.id, 'proficiency', e.target.value as any)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Native">Native</option>
                  <option value="Professional">Professional</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Elementary">Elementary</option>
                </select>
              </div>


              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          id="btn-add-language"
          onClick={() => addLanguage()}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 pt-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Another Language</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={10}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSave={onSave}
      />
    </div>
  );
};
