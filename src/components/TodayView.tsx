"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getEntry, saveEntry } from "@/lib/storage";
import { CharacterCounter } from "./CharacterCounter";
import { Edit2 } from "lucide-react";

const MAX_CHARS = 500;
const DEBOUNCE_MS = 500;

interface TodayViewProps {
  date?: string; // YYYY-MM-DD format, defaults to today
  isReadOnly?: boolean;
}

export function TodayView({ date, isReadOnly: initialReadOnly = false }: TodayViewProps) {
  const today = date || new Date().toISOString().split("T")[0];
  const isToday = today === new Date().toISOString().split("T")[0];
  const isPastEntry = !isToday;
  
  const [content, setContent] = useState("");
  const [hasEntry, setHasEntry] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [isReadOnly, setIsReadOnly] = useState(initialReadOnly || isPastEntry);

  // Debounce timer ref
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load entry on mount
  useEffect(() => {
    const entry = getEntry(today);
    setContent(entry.content);
    setHasEntry(entry.content.trim().length > 0);
  }, [today]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  // Debounced save function
  const debouncedSave = useCallback((value: string) => {
    // Clear existing timer
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    
    setSaveStatus("saving");
    
    saveTimerRef.current = setTimeout(() => {
      const success = saveEntry(today, value);
      if (success) {
        setHasEntry(value.trim().length > 0);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 1500);
      }
    }, DEBOUNCE_MS);
  }, [today]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setContent(value);
      debouncedSave(value);
    }
  };

  const handleBlur = () => {
    // Clear debounce timer and save immediately
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    saveEntry(today, content);
    setHasEntry(content.trim().length > 0);
  };

  const displayDate = formatDate(today);

  // Update readOnly when prop changes (for calendar navigation)
  useEffect(() => {
    setIsReadOnly(initialReadOnly || isPastEntry);
  }, [initialReadOnly, isPastEntry]);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-120px)] px-4 py-6 max-w-2xl mx-auto">
      {/* Date header with edit button for past entries */}
      <header className="mb-6">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-semibold text-foreground mb-1">
            {isToday ? "Today" : displayDate}
          </h2>
          <p className="text-sm text-muted">
            {isToday ? displayDate : "Viewing past entry"}
          </p>
        </div>
        
        {/* Edit button for past entries with content - ITEM-010 */}
        {isPastEntry && hasEntry && isReadOnly && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsReadOnly(false)}
              className="flex items-center gap-2 px-4 py-2 bg-pink text-white rounded-full hover:bg-pink-dark transition-colors min-h-[44px]"
              aria-label="Edit entry"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm font-medium">Edit</span>
            </button>
          </div>
        )}
      </header>

      {/* Welcome hint for new users - ITEM-004 */}
      {!hasEntry && !isReadOnly && (
        <div className="mb-6 p-4 bg-lavender/50 rounded-xl text-center">
          <p className="text-hint italic">
            What are you grateful for today?
          </p>
        </div>
      )}

      {/* Empty state for read-only past entries - ITEM-008 */}
      {!hasEntry && isReadOnly && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-hint text-lg italic mb-2">No entry for this day</p>
            <p className="text-sm text-muted">Take a moment to be grateful</p>
          </div>
        </div>
      )}

      {/* Text area */}
      <div className="flex-1 flex flex-col">
        <textarea
          value={content}
          onChange={handleChange}
          onBlur={handleBlur}
          readOnly={isReadOnly}
          placeholder={isReadOnly ? "" : "Write what you're grateful for..."}
          className={`
            flex-1 w-full min-h-[200px] p-4
            bg-white/80 rounded-xl shadow-card
            text-lg text-foreground placeholder:text-hint
            border-2 border-transparent
            focus:border-pink focus:outline-none
            resize-none transition-all duration-200
            ${isReadOnly ? "bg-lavender/30 cursor-default" : ""}
          `}
          rows={5}
          aria-label="Gratitude entry"
        />

        {/* Bottom controls */}
        <div className="mt-4 flex items-center justify-between">
          <CharacterCounter current={content.length} max={MAX_CHARS} />
          
          <div className="flex items-center gap-3">
            {/* Save status indicator */}
            {saveStatus !== "idle" && (
              <span
                className={`text-sm transition-opacity duration-300 ${
                  saveStatus === "saved" ? "text-mint" : "text-hint"
                }`}
              >
                {saveStatus === "saving" ? "Saving..." : "Saved"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
