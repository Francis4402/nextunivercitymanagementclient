import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface TimePickerProps {
  value: string; // Always in "HH:MM" format (24-hour)
  onChange: (value: string) => void; // Always returns "HH:MM" format
  className?: string;
  use12Hour?: boolean; // Only affects display, not output format
}

export const TimePicker = ({ 
  value, 
  onChange, 
  className, 
  use12Hour = false // Default to 24-hour output
}: TimePickerProps) => {
  const [open, setOpen] = useState(false);
  
  // Parse "HH:MM" format into hours, minutes
  const parseTime = useCallback((timeStr: string) => {
    if (!timeStr) return { hours: 0, minutes: 0 };
    
    const [hoursStr, minutesStr] = timeStr.split(':');
    return {
      hours: parseInt(hoursStr || '0', 10) % 24,
      minutes: parseInt(minutesStr || '0', 10) % 60
    };
  }, []);

  // Format hours and minutes into "HH:MM" string
  const formatTime = useCallback((hours: number, minutes: number) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }, []);

  const { hours: initialHours, minutes: initialMinutes } = parseTime(value);
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);

  // Update internal state when value prop changes
  useEffect(() => {
    const { hours: newHours, minutes: newMinutes } = parseTime(value);
    setHours(newHours);
    setMinutes(newMinutes);
  }, [value, parseTime]);

  const handleHourChange = (hour: number) => {
    const newHours = hour % 24;
    setHours(newHours);
    onChange(formatTime(newHours, minutes));
  };

  const handleMinuteChange = (minute: number) => {
    const newMinutes = minute % 60;
    setMinutes(newMinutes);
    onChange(formatTime(hours, newMinutes));
  };

  // Convert to 12-hour format for display only
  const displayTime = use12Hour
    ? (() => {
        const displayHours = hours % 12 || 12;
        const period = hours >= 12 ? 'PM' : 'AM';
        return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
      })()
    : formatTime(hours, minutes);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[140px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? displayTime : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="flex gap-4">
          {/* Hours */}
          <div className="flex flex-col items-center max-h-[200px] overflow-y-auto">
            {Array.from({ length: 24 }).map((_, i) => (
              <Button
                key={`hour-${i}`}
                variant={hours === i ? "default" : "ghost"}
                size="sm"
                className="w-full"
                onClick={() => handleHourChange(i)}
              >
                {i.toString().padStart(2, '0')}
              </Button>
            ))}
          </div>
          
          {/* Minutes */}
          <div className="flex flex-col items-center max-h-[200px] overflow-y-auto">
            {[0, 15, 30, 45].map((minute) => (
              <Button
                key={`minute-${minute}`}
                variant={minutes === minute ? "default" : "ghost"}
                size="sm"
                className="w-full"
                onClick={() => handleMinuteChange(minute)}
              >
                {minute.toString().padStart(2, '0')}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};