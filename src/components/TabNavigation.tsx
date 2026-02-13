"use client";

import { Calendar, PenLine } from "lucide-react";

interface TabNavigationProps {
  currentView: "today" | "calendar";
  onViewChange: (view: "today" | "calendar") => void;
}

export function TabNavigation({ currentView, onViewChange }: TabNavigationProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-soft border-t border-lavender z-50"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="flex justify-center items-center max-w-md mx-auto">
        {/* Today tab */}
        <button
          role="tab"
          aria-selected={currentView === "today"}
          aria-controls="today-panel"
          id="today-tab"
          onClick={() => onViewChange("today")}
          className={`
            flex-1 flex flex-col items-center justify-center
            py-3 px-4 min-h-[56px] min-w-[100px]
            transition-all duration-200
            ${currentView === "today" 
              ? "text-pink" 
              : "text-muted hover:text-foreground"
            }
          `}
        >
          <PenLine 
            className={`w-6 h-6 mb-1 transition-transform duration-200 ${
              currentView === "today" ? "scale-110" : ""
            }`} 
          />
          <span className="text-sm font-medium">Today</span>
          {/* Active indicator */}
          {currentView === "today" && (
            <div className="absolute bottom-0 w-12 h-1 bg-pink rounded-t-full" />
          )}
        </button>

        {/* Calendar tab */}
        <button
          role="tab"
          aria-selected={currentView === "calendar"}
          aria-controls="calendar-panel"
          id="calendar-tab"
          onClick={() => onViewChange("calendar")}
          className={`
            flex-1 flex flex-col items-center justify-center
            py-3 px-4 min-h-[56px] min-w-[100px]
            transition-all duration-200
            ${currentView === "calendar" 
              ? "text-pink" 
              : "text-muted hover:text-foreground"
            }
          `}
        >
          <Calendar 
            className={`w-6 h-6 mb-1 transition-transform duration-200 ${
              currentView === "calendar" ? "scale-110" : ""
            }`} 
          />
          <span className="text-sm font-medium">Calendar</span>
          {/* Active indicator */}
          {currentView === "calendar" && (
            <div className="absolute bottom-0 w-12 h-1 bg-pink rounded-t-full" />
          )}
        </button>
      </div>
    </nav>
  );
}
