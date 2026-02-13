// Storage types for gratitude journal
export interface GratitudeEntry {
  date: string; // YYYY-MM-DD format
  content: string;
  updatedAt: number; // timestamp
}

export interface GratitudeData {
  version: string;
  entries: Record<string, GratitudeEntry>; // key: YYYY-MM-DD
}

// UI state types
export interface JournalState {
  currentDate: string;
  currentEntry: GratitudeEntry | null;
  selectedDate: string | null;
  view: 'today' | 'calendar';
}
