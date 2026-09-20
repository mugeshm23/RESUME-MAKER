import { ResumeData } from '../types';
import { sampleFresherResume, createBlankResume } from '../data/defaultResume';

const STORAGE_KEY = 'resumecraft_resumes_v1';
const ACTIVE_ID_KEY = 'resumecraft_active_id';

export function getLocalResumes(): ResumeData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading localStorage resumes:', err);
  }
  // Initialize with the sample resume
  const initial = [sampleFresherResume];
  saveLocalResumes(initial);
  return initial;
}

export function saveLocalResumes(resumes: ResumeData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  } catch (err) {
    console.error('Error saving localStorage resumes:', err);
  }
}

export function getActiveResumeId(): string {
  return localStorage.getItem(ACTIVE_ID_KEY) || sampleFresherResume.id;
}

export function setActiveResumeId(id: string): void {
  localStorage.setItem(ACTIVE_ID_KEY, id);
}

// Server sync with graceful local fallback
export async function syncResumesFromServer(): Promise<ResumeData[]> {
  try {
    const res = await fetch('/api/resumes');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.resumes) && data.resumes.length > 0) {
        saveLocalResumes(data.resumes);
        return data.resumes;
      }
    }
  } catch (err) {
    console.warn('Backend sync unavailable, using client storage:', err);
  }
  return getLocalResumes();
}

export async function saveResumeRemoteAndLocal(resume: ResumeData): Promise<void> {
  // 1. Immediately save to localStorage
  const current = getLocalResumes();
  const idx = current.findIndex((r) => r.id === resume.id);
  const updated = { ...resume, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    current[idx] = updated;
  } else {
    current.unshift(updated);
  }
  saveLocalResumes(current);

  // 2. Sync to server in background
  try {
    await fetch('/api/resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
  } catch (err) {
    console.warn('Server save failed, local storage preserved:', err);
  }
}

export async function deleteResumeRemoteAndLocal(id: string): Promise<ResumeData[]> {
  const current = getLocalResumes().filter((r) => r.id !== id);
  const remaining = current.length > 0 ? current : [createBlankResume('My Resume')];
  saveLocalResumes(remaining);

  try {
    await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server delete failed:', err);
  }
  return remaining;
}

export async function duplicateResumeRemoteAndLocal(id: string): Promise<ResumeData | null> {
  const current = getLocalResumes();
  const target = current.find((r) => r.id === id);
  if (!target) return null;

  const duplicated: ResumeData = {
    ...target,
    id: 'res_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    title: `${target.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  current.unshift(duplicated);
  saveLocalResumes(current);

  try {
    await fetch(`/api/resumes/${id}/duplicate`, { method: 'POST' });
  } catch (err) {
    console.warn('Server duplicate fallback to local');
  }

  return duplicated;
}

export const getAllResumes = getLocalResumes;
export const saveResume = saveResumeRemoteAndLocal;
export const deleteResumeStorage = deleteResumeRemoteAndLocal;
export const duplicateResumeStorage = duplicateResumeRemoteAndLocal;
export const createNewResume = createBlankResume;

