import { GratitudeEntry, GratitudeData } from '@/types';

const STORAGE_KEY = 'gratitude-entries';
const STORAGE_VERSION = 'v1';
const DEFAULT_ENTRY: GratitudeEntry = {
  date: '',
  content: '',
  updatedAt: 0,
};

// Storage limit warning threshold (4MB out of 5MB)
const STORAGE_WARNING_THRESHOLD = 4 * 1024 * 1024; // 4MB in bytes

/**
 * Get all gratitude data from localStorage
 * Returns empty data structure if none exists
 */
export function getAllData(): GratitudeData {
  if (typeof window === 'undefined') {
    return { version: STORAGE_VERSION, entries: {} };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return { version: STORAGE_VERSION, entries: {} };
    }

    const parsed = JSON.parse(data) as Partial<GratitudeData>;
    
    // Validate data structure
    if (!parsed.version || !parsed.entries) {
      return { version: STORAGE_VERSION, entries: {} };
    }

    return {
      version: parsed.version,
      entries: parsed.entries,
    };
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return { version: STORAGE_VERSION, entries: {} };
  }
}

/**
 * Get entry for a specific date
 * Returns default entry if none exists
 */
export function getEntry(date: string): GratitudeEntry {
  const data = getAllData();
  return data.entries[date] || { ...DEFAULT_ENTRY, date };
}

/**
 * Save entry for a specific date
 * Returns true if successful, false if limit exceeded
 */
export function saveEntry(date: string, content: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const data = getAllData();
  
  const entry: GratitudeEntry = {
    date,
    content: content.trim(),
    updatedAt: Date.now(),
  };

  data.entries[date] = entry;
  data.version = STORAGE_VERSION;

  try {
    // Check if we're approaching storage limit
    const dataString = JSON.stringify(data);
    if (dataString.length > STORAGE_WARNING_THRESHOLD) {
      console.warn('Approaching localStorage limit. Consider exporting data.');
    }

    localStorage.setItem(STORAGE_KEY, dataString);
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
      return false;
    }
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

/**
 * Get all dates that have entries
 * Returns array of dates in YYYY-MM-DD format
 */
export function getDatesWithEntries(): string[] {
  const data = getAllData();
  return Object.keys(data.entries).filter(
    (date) => data.entries[date]?.content?.trim().length > 0
  );
}

/**
 * Check if a date has an entry
 */
export function hasEntry(date: string): boolean {
  const entry = getEntry(date);
  return entry.content.trim().length > 0;
}

/**
 * Get localStorage usage in bytes
 */
export function getStorageUsage(): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? data.length : 0;
}

/**
 * Check if storage is approaching limit
 */
export function isStorageApproachingLimit(): boolean {
  return getStorageUsage() > STORAGE_WARNING_THRESHOLD;
}

/**
 * Delete entry for a specific date
 */
export function deleteEntry(date: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const data = getAllData();
  if (data.entries[date]) {
    delete data.entries[date];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  }
  return false;
}

/**
 * Get all entries as an array
 */
export function getAllEntriesArray(): GratitudeEntry[] {
  const data = getAllData();
  return Object.values(data.entries).filter(
    (entry) => entry.content.trim().length > 0
  );
}
