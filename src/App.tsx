/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ResumeData } from './types';
import { SAMPLE_RESUME } from './data/defaultResume';
import {
  getAllResumes,
  saveResume,
  deleteResumeStorage,
  duplicateResumeStorage,
  createNewResume,
} from './utils/storage';
import { calculateATSScore } from './utils/atsChecker';
import { exportResumeToPdf } from './utils/pdfExport';

// Components
import { Navbar } from './components/Navbar';
import { ProgressBar } from './components/ProgressBar';
import { LivePreviewDrawer } from './components/LivePreviewDrawer';
import { JobMatcherModal } from './components/modals/JobMatcherModal';
import { ATSScoreModal } from './components/modals/ATSScoreModal';
import { DashboardModal } from './components/modals/DashboardModal';
import { ResumeDocument } from './components/templates/ResumeDocument';

// Steps
import { Step1Personal } from './components/steps/Step1Personal';
import { Step2Career } from './components/steps/Step2Career';
import { Step3Education } from './components/steps/Step3Education';
import { Step4Skills } from './components/steps/Step4Skills';
import { Step5Experience } from './components/steps/Step5Experience';
import { Step6Internships } from './components/steps/Step6Internships';
import { Step7Projects } from './components/steps/Step7Projects';
import { Step8Certifications } from './components/steps/Step8Certifications';
import { Step9Achievements } from './components/steps/Step9Achievements';
import { Step10Languages } from './components/steps/Step10Languages';
import { Step11Extracurricular } from './components/steps/Step11Extracurricular';
import { Step12Positions } from './components/steps/Step12Positions';
import { Step13Publications } from './components/steps/Step13Publications';
import { Step14References } from './components/steps/Step14References';
import { Step15Preferences } from './components/steps/Step15Preferences';
import { Step16FinalReview } from './components/steps/Step16FinalReview';
import { Step17Generate } from './components/steps/Step17Generate';

export default function App() {
  const [allResumes, setAllResumes] = useState<ResumeData[]>([]);
  const [currentResume, setCurrentResume] = useState<ResumeData>(SAMPLE_RESUME);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2, 3, 4, 7, 15]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Modals & Panels
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState<boolean>(false);
  const [isJobMatcherOpen, setIsJobMatcherOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize resumes from storage
  useEffect(() => {
    const loaded = getAllResumes();
    if (loaded && loaded.length > 0) {
      setAllResumes(loaded);
      setCurrentResume(loaded[0]);
    } else {
      setAllResumes([SAMPLE_RESUME]);
      setCurrentResume(SAMPLE_RESUME);
    }
  }, []);

  // Real-time ATS computation
  const atsResult = useMemo(() => {
    return calculateATSScore(currentResume);
  }, [currentResume]);

  // Debounced auto-save
  const triggerAutoSave = (updated: ResumeData) => {
    setCurrentResume(updated);
    setIsSaving(true);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      await saveResume(updated);
      setIsSaving(false);
      setAllResumes((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    }, 600);
  };

  // Manual explicit save
  const handleManualSave = async () => {
    setIsSaving(true);
    await saveResume(currentResume);
    setIsSaving(false);
    setSaveNotification('All changes saved successfully');
    setTimeout(() => setSaveNotification(null), 2500);
  };

  // Mark step as completed and go to next
  const handleStepNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    if (currentStep < 17) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepSkip = () => {
    if (currentStep < 17) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (step: number = 1) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // PDF Export using html-to-image + jsPDF
  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      const fileName = `${(currentResume.personalInfo.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`;
      await exportResumeToPdf('pdf-export-document', fileName, currentResume.preferences.pageSize);
    } catch (err) {
      console.error('PDF export failed:', err);
      // Fallback to browser print if canvas rendering fails
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };


  const handlePrint = () => {
    window.print();
  };

  // Resume Management Handlers
  const handleCreateNew = () => {
    const blank = createNewResume();
    setAllResumes((prev) => [blank, ...prev]);
    setCurrentResume(blank);
    setCurrentStep(1);
    setCompletedSteps([]);
  };

  const handleLoadSample = () => {
    const sampleClone = {
      ...SAMPLE_RESUME,
      id: 'resume_' + Date.now(),
      title: 'Full Stack Developer - Sample',
      updatedAt: new Date().toISOString(),
    };
    saveResume(sampleClone);
    setAllResumes((prev) => [sampleClone, ...prev]);
    setCurrentResume(sampleClone);
    setCurrentStep(1);
    setCompletedSteps([1, 2, 3, 4, 7, 15]);
  };

  const handleDuplicate = async (id: string) => {
    const duplicated = await duplicateResumeStorage(id);
    if (duplicated) {
      setAllResumes((prev) => [duplicated, ...prev]);
      setCurrentResume(duplicated);
    }
  };

  const handleDelete = async (id: string) => {
    const remaining = await deleteResumeStorage(id);
    setAllResumes(remaining);
    if (remaining.length > 0) {
      setCurrentResume(remaining[0]);
    }
  };


  const handleSelectResume = (res: ResumeData) => {
    setCurrentResume(res);
    setCurrentStep(1);
  };

  const handleUpdateTitle = (title: string) => {
    const updated = { ...currentResume, title, updatedAt: new Date().toISOString() };
    triggerAutoSave(updated);
  };

  // Step Switcher renderer
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Personal
            data={currentResume.personalInfo}
            onChange={(personalInfo) =>
              triggerAutoSave({ ...currentResume, personalInfo })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 2:
        return (
          <Step2Career
            data={currentResume.careerInfo}
            skills={currentResume.skills}
            onChange={(careerInfo) =>
              triggerAutoSave({ ...currentResume, careerInfo })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 3:
        return (
          <Step3Education
            education={currentResume.education}
            onChange={(education) =>
              triggerAutoSave({ ...currentResume, education })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 4:
        return (
          <Step4Skills
            skills={currentResume.skills}
            softSkills={currentResume.softSkills}
            onChangeSkills={(skills) =>
              triggerAutoSave({ ...currentResume, skills })
            }
            onChangeSoftSkills={(softSkills) =>
              triggerAutoSave({ ...currentResume, softSkills })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 5:
        return (
          <Step5Experience
            experience={currentResume.experience}
            onChange={(experience) =>
              triggerAutoSave({ ...currentResume, experience })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 6:
        return (
          <Step6Internships
            internships={currentResume.internships}
            onChange={(internships) =>
              triggerAutoSave({ ...currentResume, internships })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 7:
        return (
          <Step7Projects
            projects={currentResume.projects}
            onChange={(projects) =>
              triggerAutoSave({ ...currentResume, projects })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 8:
        return (
          <Step8Certifications
            certifications={currentResume.certifications}
            onChange={(certifications) =>
              triggerAutoSave({ ...currentResume, certifications })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 9:
        return (
          <Step9Achievements
            achievements={currentResume.achievements}
            onChange={(achievements) =>
              triggerAutoSave({ ...currentResume, achievements })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 10:
        return (
          <Step10Languages
            languages={currentResume.languages}
            onChange={(languages) =>
              triggerAutoSave({ ...currentResume, languages })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 11:
        return (
          <Step11Extracurricular
            activities={currentResume.extracurricular}
            onChange={(extracurricular) =>
              triggerAutoSave({ ...currentResume, extracurricular })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 12:
        return (
          <Step12Positions
            positions={currentResume.positionsOfResponsibility}
            onChange={(positionsOfResponsibility) =>
              triggerAutoSave({ ...currentResume, positionsOfResponsibility })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 13:
        return (
          <Step13Publications
            publications={currentResume.publications}
            onChange={(publications) =>
              triggerAutoSave({ ...currentResume, publications })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 14:
        return (
          <Step14References
            references={currentResume.references}
            preferences={currentResume.preferences}
            onChangeReferences={(references) =>
              triggerAutoSave({ ...currentResume, references })
            }
            onChangePreferences={(preferences) =>
              triggerAutoSave({ ...currentResume, preferences })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSkip={handleStepSkip}
            onSave={handleManualSave}
          />
        );
      case 15:
        return (
          <Step15Preferences
            preferences={currentResume.preferences}
            onChange={(preferences) =>
              triggerAutoSave({ ...currentResume, preferences })
            }
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 16:
        return (
          <Step16FinalReview
            data={currentResume}
            atsResult={atsResult}
            onGoToStep={handleJumpToStep}
            onNext={handleStepNext}
            onBack={handleStepBack}
            onSave={handleManualSave}
          />
        );
      case 17:
        return (
          <Step17Generate
            data={currentResume}
            atsResult={atsResult}
            onBackToEdit={handleJumpToStep}
            onOpenJobMatcher={() => setIsJobMatcherOpen(true)}
            onDownloadPdf={handleDownloadPdf}
            onPrint={handlePrint}
            isExportingPdf={isExportingPdf}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Save Notification Toast */}
      {saveNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200 no-print">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Main App Navigation */}
      <Navbar
        resumeTitle={currentResume.title}
        onUpdateTitle={handleUpdateTitle}
        currentStep={currentStep}
        totalSteps={17}
        atsResult={atsResult}
        isSaving={isSaving}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onOpenJobMatcher={() => setIsJobMatcherOpen(true)}
        onOpenScoreModal={() => setIsScoreModalOpen(true)}
        onTogglePreview={() => setIsPreviewOpen((prev) => !prev)}
        isPreviewOpen={isPreviewOpen}
        onPrint={handlePrint}
        onDownloadPdf={handleDownloadPdf}
        isExportingPdf={isExportingPdf}
      />

      {/* Progress & Step Navigation Header */}
      {currentStep < 17 && (
        <ProgressBar
          currentStep={currentStep}
          onSelectStep={handleJumpToStep}
          completedSteps={completedSteps}
        />
      )}

      {/* Form Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        {renderCurrentStep()}
      </main>

      {/* Hidden Print Container used when browser prints */}
      <div id="hidden-print-container" className="print-only">
        <ResumeDocument data={currentResume} id="print-resume-doc" />
      </div>

      {/* Dedicated Offscreen Container for 1:1 Crisp PDF Capture */}
      <div
        aria-hidden="true"
        className="no-print"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          pointerEvents: 'none',
          opacity: 0,
          zIndex: -999,
        }}
      >
        <ResumeDocument data={currentResume} id="pdf-export-document" />
      </div>


      {/* Slide-over Live Preview Drawer */}
      <LivePreviewDrawer
        isOpen={isPreviewOpen && currentStep < 17}
        onClose={() => setIsPreviewOpen(false)}
        data={currentResume}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
      />

      {/* Modals */}
      <JobMatcherModal
        isOpen={isJobMatcherOpen}
        onClose={() => setIsJobMatcherOpen(false)}
        data={currentResume}
      />

      <ATSScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        result={atsResult}
      />

      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        resumes={allResumes}
        currentResumeId={currentResume.id}
        onSelectResume={handleSelectResume}
        onCreateNew={handleCreateNew}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onLoadSample={handleLoadSample}
      />
    </div>
  );
}
