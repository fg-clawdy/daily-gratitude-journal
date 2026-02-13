"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { getDatesWithEntries } from "@/lib/storage";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  onSelectDate: (date: string) => void;
  selectedDate: string | null;
}

export function CalendarView({ onSelectDate, selectedDate }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const datesWithEntries = useMemo(() => new Set(getDatesWithEntries()), []);
  
  // Touch handling for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // Minimum swipe distance in pixels

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = monthStart.getDay(); // 0 = Sunday
  const daysInMonth = monthEnd.getDate();

  const today = new Date().toISOString().split("T")[0];
  const isFutureMonth =
    currentMonth.getFullYear() > new Date().getFullYear() ||
    (currentMonth.getFullYear() === new Date().getFullYear() &&
      currentMonth.getMonth() > new Date().getMonth());

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    if (!isFutureMonth) {
      setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
  }, [isFutureMonth]);

  // Touch handlers for swipe gestures - ITEM-009
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left = next month
      handleNextMonth();
    } else if (isRightSwipe) {
      // Swipe right = previous month
      handlePrevMonth();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleDayClick = (day: number) => {
    const date = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onSelectDate(date);
  };

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    // Empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [startDay, daysInMonth]);

  // Check if any entries exist (for empty state - ITEM-008)
  const hasAnyEntries = datesWithEntries.size > 0;

  return (
    <div 
      className="flex flex-col h-full px-4 py-6 max-w-2xl mx-auto"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Month header with navigation - ITEM-009 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-3 rounded-full hover:bg-lavender active:bg-lavender-dark transition-colors min-h-[44px] min-w-[44px]"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        
        <h2 className="text-xl font-semibold text-foreground">{monthName}</h2>
        
        <button
          onClick={handleNextMonth}
          disabled={isFutureMonth}
          className="p-3 rounded-full hover:bg-lavender active:bg-lavender-dark transition-colors min-h-[44px] min-w-[44px] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Empty state - ITEM-008 */}
      {!hasAnyEntries && (
        <div className="mb-6 p-4 bg-lavender/50 rounded-xl text-center">
          <p className="text-hint italic">
            Start writing to see your gratitude journey
          </p>
        </div>
      )}

      {/* Calendar grid - ITEM-002 */}
      <div className="bg-white/80 rounded-2xl shadow-card p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="h-12" />;
            }

            const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const isToday = dateString === today;
            const isSelected = dateString === selectedDate;
            const hasEntryForDay = datesWithEntries.has(dateString);
            const isFuture = new Date(dateString) > new Date(today);

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={isFuture}
                className={`
                  h-12 min-h-[48px] min-w-[48px] rounded-xl
                  flex flex-col items-center justify-center
                  transition-all duration-200
                  ${isFuture ? "opacity-30 cursor-not-allowed" : "hover:bg-lavender cursor-pointer"}
                  ${isSelected ? "bg-pink text-white hover:bg-pink-dark" : ""}
                  ${isToday && !isSelected ? "bg-mint/50" : ""}
                `}
                aria-label={`${day} ${monthName}${isToday ? " (Today)" : ""}${hasEntryForDay ? " - Entry available" : ""}`}
              >
                <span
                  className={`text-base font-medium ${
                    isSelected ? "text-white" : "text-foreground"
                  }`}
                >
                  {day}
                </span>
                {/* Entry indicator dot - ITEM-002 */}
                {hasEntryForDay && (
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      isSelected ? "bg-white" : "bg-mint-dark"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Swipe hint for mobile */}
      <p className="text-center text-hint text-xs mt-4 hidden sm:block md:hidden">
        Swipe left or right to navigate months
      </p>
    </div>
  );
}
