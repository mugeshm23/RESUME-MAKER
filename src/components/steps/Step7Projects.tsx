import React, { useState } from 'react';
import { ProjectItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { FolderGit2, Plus, Trash2, Github, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';

interface Step7Props {
  projects: ProjectItem[];
  onChange: (projects: ProjectItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

export const Step7Projects: React.FC<Step7Props> = ({
  projects,
  onChange,
  onNext,
  onBack,
  onSave,
}) => {
  const [enhancingKey, setEnhancingKey] = useState<string | null>(null);

  const addProject = () => {
    const newItem: ProjectItem = {
      id: 'proj_' + Date.now(),
      name: '',
      role: 'Full Stack Developer',
      technologiesUsed: [],
      frameworks: [],
      database: '',
      tools: [],
      description: '',
      keyFeatures: [''],
      githubUrl: '',
      liveDemoUrl: '',
      achievementsResults: [''],
    };

    onChange([...projects, newItem]);
  };

  const updateItem = (id: string, field: keyof ProjectItem, value: any) => {
    onChange(
      projects.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(projects.filter((item) => item.id !== id));
  };

  const addFeature = (id: string) => {
    onChange(
      projects.map((item) =>
        item.id === id
          ? { ...item, keyFeatures: [...(item.keyFeatures || []), ''] }
          : item
      )
    );
  };

  const updateFeature = (id: string, idx: number, val: string) => {
    onChange(
      projects.map((item) => {
        if (item.id !== id) return item;
        const copy = [...(item.keyFeatures || [])];
        copy[idx] = val;
        return { ...item, keyFeatures: copy };
      })
    );
  };

  const removeFeature = (id: string, idx: number) => {
    onChange(
      projects.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          keyFeatures: (item.keyFeatures || []).filter((_, i) => i !== idx),
        };
      })
    );
  };

  const handleEnhanceBullet = async (id: string, idx: number, text: string, projName: string) => {
    if (!text.trim()) return;
    const key = `${id}-${idx}`;
    setEnhancingKey(key);

    try {
      const res = await fetch('/api/ai/enhance-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputItem: text,
          contextType: 'Technical Project Feature',
          roleOrTitle: projName,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.bullet) {
          updateFeature(id, idx, data.bullet);
        }
      }
    } catch (err) {
      console.error('Failed to enhance bullet:', err);
    } finally {
      setEnhancingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Showcase your technical projects!</p>
        <p className="text-blue-700 text-xs mt-0.5">
          Projects demonstrate your ability to write clean code, solve real problems, and work with modern developer tools. Include GitHub repositories and live demo links whenever possible.
        </p>
      </div>

      <div className="space-y-5">
        {projects.map((proj, index) => (
          <div
            key={proj.id}
            className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-blue-600" />
                <span>Project #{index + 1} {proj.name ? `— ${proj.name}` : ''}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(proj.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                title="Remove this project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Project Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Project Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. AI-Assisted Resume Builder Web App"
                  value={proj.name}
                  onChange={(e) => updateItem(proj.id, 'name', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Your Role in the Project
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lead Full Stack Developer / Solo Creator"
                  value={proj.role || ''}
                  onChange={(e) => updateItem(proj.id, 'role', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Technologies Used */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                Technologies & Tools Used (comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. React, TypeScript, Node.js, Express, Tailwind CSS, Gemini API"
                value={proj.technologiesUsed.join(', ')}
                onChange={(e) =>
                  updateItem(
                    proj.id,
                    'technologiesUsed',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-stone-700" />
                  <span>GitHub Repository URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project-repo"
                  value={proj.githubUrl || ''}
                  onChange={(e) => updateItem(proj.id, 'githubUrl', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1 flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Live Demo / Hosted URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://my-app.vercel.app"
                  value={proj.liveDemoUrl || ''}
                  onChange={(e) => updateItem(proj.id, 'liveDemoUrl', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* High-level Description */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                Project Overview / Problem Statement
              </label>
              <textarea
                rows={2}
                placeholder="Engineered a responsive single-page application that guides users through a multi-step resume workflow with instant ATS-safe previews..."
                value={proj.description}
                onChange={(e) => updateItem(proj.id, 'description', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-normal"
              />
            </div>

            {/* Key Features Bullet Points with AI Polish */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                  Key Technical Features & Implementation Highlights
                </label>
                <span className="text-[11px] text-stone-500">Add action-driven bullets</span>
              </div>

              <div className="space-y-2">
                {(proj.keyFeatures || []).map((feat, idx) => {
                  const isEnhancingThis = enhancingKey === `${proj.id}-${idx}`;
                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-stone-400 mt-2 font-mono text-xs">•</span>
                      <input
                        type="text"
                        placeholder="e.g. Implemented client-side PDF export with vector scaling using jspdf and html2canvas"
                        value={feat}
                        onChange={(e) => updateFeature(proj.id, idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleEnhanceBullet(proj.id, idx, feat, proj.name)}
                        disabled={isEnhancingThis || !feat.trim()}
                        className="px-2.5 py-1.5 text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md flex items-center gap-1 shrink-0 border border-blue-200 transition-colors disabled:opacity-40"
                      >
                        {isEnhancingThis ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        <span className="hidden sm:inline">Polish</span>
                      </button>
                      {(proj.keyFeatures || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(proj.id, idx)}
                          className="text-stone-400 hover:text-rose-600 mt-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => addFeature(proj.id)}
                className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Feature Bullet</span>
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          id="btn-add-project"
          onClick={addProject}
          className="w-full py-3.5 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Another Technical Project</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={7}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSave={onSave}
      />
    </div>
  );
};
