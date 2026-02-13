"use client";

interface CharacterCounterProps {
  current: number;
  max: number;
}

export function CharacterCounter({ current, max }: CharacterCounterProps) {
  const remaining = max - current;
  
  // Determine color based on remaining characters
  const getColorClass = () => {
    if (remaining <= 10) return "text-red-500 font-semibold";
    if (remaining <= 50) return "text-orange-500";
    return "text-muted";
  };

  return (
    <div className={`text-sm ${getColorClass()} transition-colors duration-200`}>
      {remaining} characters remaining
    </div>
  );
}
