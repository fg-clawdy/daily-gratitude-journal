"use client";

import { useState, useEffect } from "react";
import { TodayView } from "@/components/TodayView";
import { CalendarView } from "@/components/CalendarView";
import { TabNavigation } from "@/components/TabNavigation";

export default function Home() {
  const [view, setView] = useState<"today" | "calendar">("today");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Load view preference from localStorage on mount
  useEffect(() => {
    const savedView = localStorage.getItem("gratitude-view");
    if (savedView === "today" || savedView === "calendar") {
      setView(savedView);
    }
  }, []);

  // Save view preference to localStorage
  const handleViewChange = (newView: "today" | "calendar") => {
    setView(newView);
    localStorage.setItem("gratitude-view", newView);
    
    // Reset to today's view when switching back
    if (newView === "today") {
      setSelectedDate(null);
      setIsReadOnly(false);
    }
  };

  // Handle date selection from calendar
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    
    // Check if this is a past date (read-only)
    const today = new Date().toISOString().split("T")[0];
    const isPastDate = date !== today;
    setIsReadOnly(isPastDate);
    
    // Switch to today view to show the selected entry
    setView("today");
  };

  // Get the date to display (today or selected)
  const displayDate = selectedDate || new Date().toISOString().split("T")[0];

  return (
    <main className="min-h-screen pb-20">
      {/* Content area */}
      <div className="pb-4">
        {view === "today" ? (
          <div
            id="today-panel"
            role="tabpanel"
            aria-labelledby="today-tab"
          >
            <TodayView 
              date={displayDate} 
              isReadOnly={isReadOnly} 
            />
          </div>
        ) : (
          <div
            id="calendar-panel"
            role="tabpanel"
            aria-labelledby="calendar-tab"
          >
            <CalendarView 
              onSelectDate={handleSelectDate}
              selectedDate={selectedDate}
            />
          </div>
        )}
      </div>

      {/* Bottom tab navigation */}
      <TabNavigation 
        currentView={view} 
        onViewChange={handleViewChange} 
      />
    </main>
  );
}
