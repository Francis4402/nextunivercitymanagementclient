import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useState } from "react";

interface TimePickerProps {
  value: string; // Format: "HH:MM" (24-hour) or "HH:MM AM/PM" (12-hour)
  onChange: (value: string) => void;
  className?: string;
  use12Hour?: boolean; // Add this prop to toggle between 12/24 hour format
}

export const TimePicker = ({ 
  value, 
  onChange, 
  className, 
  use12Hour = true // Default to 12-hour format
}: TimePickerProps) => {
  const [open, setOpen] = useState(false);
  
  // Parse the time value
  const parseTime = (timeStr: string) => {
    if (!timeStr) return { hours: 0, minutes: 0, period: 'AM' };
    
    if (use12Hour) {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      return { 
        hours: period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours,
        minutes,
        period: period || 'AM'
      };
    } else {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return { 
        hours, 
        minutes,
        period: hours >= 12 ? 'PM' : 'AM'
      };
    }
  };

  const { hours: initialHours, minutes: initialMinutes, period: initialPeriod } = parseTime(value);
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [period, setPeriod] = useState<'AM' | 'PM'>(initialPeriod as 'AM' | 'PM');

  const handleHourChange = (hour: number) => {
    setHours(hour);
    updateTime(hour, minutes, period);
  };

  const handleMinuteChange = (minute: number) => {
    setMinutes(minute);
    updateTime(hours, minute, period);
  };

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    setPeriod(newPeriod);
    updateTime(hours, minutes, newPeriod);
  };

  const updateTime = (h: number, m: number, p: 'AM' | 'PM') => {
    if (use12Hour) {
      const displayHours = p === 'PM' && h !== 12 ? h - 12 : p === 'AM' && h === 12 ? 0 : h;
      onChange(`${displayHours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${p}`);
    } else {
      const twentyFourHours = p === 'PM' && h !== 12 ? h + 12 : p === 'AM' && h === 12 ? 0 : h;
      onChange(`${twentyFourHours.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    }
  };

  const displayHours = use12Hour 
    ? period === 'PM' && hours !== 12 
      ? hours - 12 
      : period === 'AM' && hours === 12 
        ? 0 
        : hours
    : hours;

  const displayValue = use12Hour
    ? `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
    : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

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
          {value ? displayValue : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="flex gap-4">
          {/* Hours */}
          <div className="flex flex-col items-center max-h-[200px] overflow-y-auto">
            {Array.from({ length: use12Hour ? 12 : 24 }).map((_, i) => {
              const hour = use12Hour ? i + 1 : i;
              return (
                <Button
                  key={`hour-${hour}`}
                  variant={hours === hour ? "default" : "ghost"}
                  size="sm"
                  className="w-full"
                  onClick={() => handleHourChange(hour)}
                >
                  {hour.toString().padStart(2, '0')}
                </Button>
              );
            })}
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

          {/* AM/PM Selector */}
          {use12Hour && (
            <div className="flex flex-col items-center max-h-[200px]">
              <Button
                variant={period === 'AM' ? "default" : "ghost"}
                size="sm"
                className="w-full"
                onClick={() => handlePeriodChange('AM')}
              >
                AM
              </Button>
              <Button
                variant={period === 'PM' ? "default" : "ghost"}
                size="sm"
                className="w-full"
                onClick={() => handlePeriodChange('PM')}
              >
                PM
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};