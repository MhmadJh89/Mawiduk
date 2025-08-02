import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchAvailableMonths } from "../../../redux/Booking/slices/getAvailableMonths";
import {
  setDateId,
  setDateInfo,
  setTimeInfo,
} from "../../../redux/Booking/slices/serviceIdSlice";
import { fetchAvailableTimes } from "../../../redux/Booking/slices/getAvailableTimes";

export default function MyCalendar() {
  const dispatch = useDispatch<AppDispatch>();
  const { staffId } = useSelector((state: RootState) => state.serviceId);
  useEffect(() => {
    dispatch(fetchAvailableMonths());
  }, [dispatch, staffId]);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.availableMonths
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setDateId(data[0].id));
      dispatch(setDateInfo(data[0]));
    }
  }, [dispatch, data]);
  const availableDays = useMemo(() => {
    return data.map((day) => new Date(day.date));
  }, [data]);
  useEffect(() => {});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  useEffect(() => {
    if (availableDays.length > 0) {
      setSelectedDate(availableDays[0]);
    }
  }, [availableDays]);

  return (
    <div className="px-4 xl:pl-0 max-lg:px-0 max-lg:mt-10">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          const selectedDateInfo = data.find((item) => {
            if (date) {
              return new Date(item.date).getTime() === date.getTime();
            }
          });
          dispatch(setDateInfo(selectedDateInfo));
          dispatch(setDateId(selectedDateInfo?.id));
          dispatch(fetchAvailableTimes());
          dispatch(setTimeInfo(null))
        }}
        inline
        includeDates={availableDays}
      />
    </div>
  );
}
