import React from 'react';
import { PublicationItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { BookOpen, Plus, Trash2, ExternalLink } from 'lucide-react';

interface Step13Props {
  publications: PublicationItem[];
  onChange: (publications: PublicationItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export const Step13Publications: React.FC<Step13Props> = ({
  publications,
  onChange,
  onNext,
  onBack,
  onSkip,
  onSave,
}) => {
  const addPublication = () => {
    const newItem: PublicationItem = {
      id: 'pub_' + Date.now(),
      title: '',
      authors: '',
      journalConference: '',
      publicationDate: '',
      url: '',
      description: '',
    };
    onChange([...publications, newItem]);
  };


  const updateItem = (id: string, field: keyof PublicationItem, value: any) => {
    onChange(
      publications.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(publications.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Publications & Research Papers (Optional)</p>
        <p className="text-blue-700 text-xs mt-0.5">
          If you have authored or co-authored academic papers, IEEE conference proceedings, or technical whitepapers, add them here.
        </p>
      </div>

      <div className="space-y-4">
        {publications.map((pub, index) => (
          <div
            key={pub.id}
            className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Publication #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(pub.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Paper / Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Consensus in Edge Computing Networks"
                  value={pub.title}
                  onChange={(e) => updateItem(pub.id, 'title', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. June 2024"
                  value={pub.publicationDate}
                  onChange={(e) => updateItem(pub.id, 'publicationDate', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Journal / Conference
                </label>
                <input
                  type="text"
                  placeholder="e.g. IEEE International Conference on Computing"
                  value={pub.journalConference}
                  onChange={(e) => updateItem(pub.id, 'journalConference', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                  <span>DOI or Paper URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://doi.org/..."
                  value={pub.url || ''}
                  onChange={(e) => updateItem(pub.id, 'url', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          id="btn-add-publication"
          onClick={addPublication}
          className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Publication / Paper</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={13}
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
