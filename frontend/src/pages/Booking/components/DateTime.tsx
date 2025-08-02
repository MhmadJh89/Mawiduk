import { useDispatch, useSelector } from "react-redux";
import DateCard from "./DateCard";
import TimeCard from "./TimeCard";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useEffect } from "react";
import { fetchAvailableTimes } from "../../../redux/Booking/slices/getAvailableTimes";
import { setTimeInfo } from "../../../redux/Booking/slices/serviceIdSlice";

export default function DateTime() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.availableTimes
  );
  const { dateId } = useSelector((state: RootState) => state.serviceId);
  useEffect(() => {
    if (dateId) {
      dispatch(fetchAvailableTimes());
    }
  }, [dispatch, dateId]);
  const handleSelectedTime = (timeInfo: string) => {
    dispatch(setTimeInfo(timeInfo));
  };

  return (
    <div className="col-span-9 flex max-lg:flex-wrap max-lg:justify-center">
      <div className="time flex flex-wrap gap-5 max-xl:w-ful content-start max-lg:justify-center">
        {data.map((item) => {
          return (
            <TimeCard
              onclickFunc={() => {
                handleSelectedTime(item);
              }}
              time={item.time}
              key={item.id}
            />
          );
        })}
      </div>
      <div className="max-sm:w-[320px]">
        <DateCard></DateCard>
      </div>
    </div>
  );
}
