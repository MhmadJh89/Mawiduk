import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="px-4 xl:pl-0 max-lg:px-0 max-lg:mt-10">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
      />
    </div>
  );
}
