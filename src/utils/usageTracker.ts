const USAGE_KEY = 'sra_pdf_usage_count';
export const MAX_FREE_USAGE = 3;

export const getUsageCount = (): number => {
  try {
    const val = localStorage.getItem(USAGE_KEY);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
};

export const incrementUsageCount = (): number => {
  try {
    const current = getUsageCount();
    const next = current + 1;
    localStorage.setItem(USAGE_KEY, next.toString());
    return next;
  } catch {
    return 0;
  }
};

export const resetUsageCount = (): void => {
  try {
    localStorage.setItem(USAGE_KEY, '0');
  } catch {
    // ignore
  }
};

export const hasReachedLimit = (): boolean => {
  return getUsageCount() >= MAX_FREE_USAGE;
};
