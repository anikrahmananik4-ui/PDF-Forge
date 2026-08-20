import { RecentJob } from '../types/pdf';

const HISTORY_KEY = 'sra_pdf_history';

export const getJobHistory = (): RecentJob[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentJob[];
  } catch {
    return [];
  }
};

export const addJobToHistory = (job: {
  toolId: string;
  toolTitle: string;
  filename: string;
  originalSize: number;
  outputSize: number;
}): RecentJob => {
  try {
    const current = getJobHistory();
    const newEntry: RecentJob = {
      id: 'job-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      toolId: job.toolId,
      toolTitle: job.toolTitle,
      filename: job.filename,
      originalSize: job.originalSize,
      outputSize: job.outputSize,
      timestamp: Date.now()
    };

    const updated = [newEntry, ...current].slice(0, 50); // Keep last 50 entries
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

    // Dispatch real-time event for UI sync across components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sra_history_updated', { detail: updated }));
    }

    return newEntry;
  } catch {
    return {
      id: 'job-' + Date.now(),
      ...job,
      timestamp: Date.now()
    };
  }
};

export const clearJobHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sra_history_updated', { detail: [] }));
    }
  } catch {
    // ignore
  }
};

export const removeJobFromHistory = (id: string): void => {
  try {
    const current = getJobHistory();
    const updated = current.filter((j) => j.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sra_history_updated', { detail: updated }));
    }
  } catch {
    // ignore
  }
};
