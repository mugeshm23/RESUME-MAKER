import React from 'react';
import { EducationItem } from '../../types';
import { StepNavigationButtons } from './StepNavigationButtons';
import { GraduationCap, Plus, Trash2, BookOpen } from 'lucide-react';

interface Step3Props {
  education: EducationItem[];
  onChange: (education: EducationItem[]) => void;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

export const Step3Education: React.FC<Step3Props> = ({
  education,
  onChange,
  onNext,
  onBack,
  onSave,
}) => {
  const addEducation = () => {
    const newItem: EducationItem = {
      id: 'edu_' + Date.now(),
      degree: 'B.E.',
      specialization: 'Computer Science and Engineering',
      institution: '',
      location: '',
      startYear: '2024',
      endYear: '2028',
      isCurrentlyStudying: true,
      gpa: '',
      relevantCoursework: '',
      academicAchievements: '',
    };
    onChange([...education, newItem]);
  };

  const updateItem = (id: string, field: keyof EducationItem, value: any) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-blue-900 text-sm">
        <p className="font-semibold text-blue-950">Now tell us about your education.</p>
        <p className="text-blue-700 text-xs mt-0.5">
          For freshers and students, education is often the highlight of your resume. Include your college, expected graduation year, and GPA.
        </p>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="bg-white border border-stone-200 rounded-xl p-6 shadow-2xs space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Education #{index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => removeItem(edu.id)}
                className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                title="Remove this education record"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Degree & Specialization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Degree / Qualification <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. B.E. / B.Tech / B.S. / High School"
                  value={edu.degree}
                  onChange={(e) => updateItem(edu.id, 'degree', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Specialization / Major
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer and Communication Engineering"
                  value={edu.specialization}
                  onChange={(e) => updateItem(edu.id, 'specialization', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* College & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  College / University <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. VSB Engineering College"
                  value={edu.institution}
                  onChange={(e) => updateItem(edu.id, 'institution', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Location (City, State)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Karur, Tamil Nadu"
                  value={edu.location}
                  onChange={(e) => updateItem(edu.id, 'location', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Years & CGPA */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Start Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2024"
                  value={edu.startYear}
                  onChange={(e) => updateItem(edu.id, 'startYear', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  End Year / Expected
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2028 or Present"
                  value={edu.endYear}
                  onChange={(e) => updateItem(edu.id, 'endYear', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  CGPA / Percentage
                </label>
                <input
                  type="text"
                  placeholder="e.g. 8.4 / 10 or 85%"
                  value={edu.gpa}
                  onChange={(e) => updateItem(edu.id, 'gpa', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Relevant Coursework & Honors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Relevant Coursework
                </label>
                <input
                  type="text"
                  placeholder="e.g. Data Structures & Algorithms, DBMS, Operating Systems"
                  value={edu.relevantCoursework || ''}
                  onChange={(e) => updateItem(edu.id, 'relevantCoursework', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                  Academic Honors / Achievements
                </label>
                <input
                  type="text"
                  placeholder="e.g. Department Honor List / Top 5% Rank"
                  value={edu.academicAchievements || ''}
                  onChange={(e) => updateItem(edu.id, 'academicAchievements', e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          id="btn-add-education"
          onClick={addEducation}
          className="w-full py-3 border-2 border-dashed border-stone-300 hover:border-blue-500 hover:bg-blue-50/50 rounded-xl text-stone-700 hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Education Record</span>
        </button>
      </div>

      <StepNavigationButtons
        currentStep={3}
        totalSteps={17}
        onBack={onBack}
        onNext={onNext}
        onSave={onSave}
      />
    </div>
  );
};
