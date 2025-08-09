import React, { useEffect, useState } from "react";
import { type RootState, type AppDispatch } from "../../../redux/store";
import {
  fetchDays,
  type GetDays,
} from "../../../redux/Services/slices/getDays";
import type {
  AsyncThunkAction,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { updateCalenderAvFunc } from "../../../redux/Services/slices/updateCalenderState";
import Button from "../../../components/ui/Button";
import type { Calender } from "../../../redux/Services/slices/getCalenders";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Times from "./Times";
interface DayPlannerProps {
  calendarId: number | null;
  onClose: Function;
  currentCalender: Calender | null;
}
const DayPlanner = ({
  calendarId,
  onClose,
  currentCalender,
}: DayPlannerProps) => {
  const calenders = useSelector<RootState, GetDays[]>(
    (state) => state.getDaysReducer.data
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log(currentCalender);
  }, [currentCalender]);
  useEffect(() => {
    if (calendarId !== null) {
      dispatch(fetchDays(calendarId));
    }
  }, [dispatch, calendarId]);
  const calenderStateHandleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedState = e.target.value as "open" | "closed";
    dispatch(updateCalenderAvFunc({ id, state: selectedState })).then(() => {
      dispatch(fetchDays(calendarId));
    });
  };
  const getMonthNameEn = function (monthNumber: number): string {
    return new Date(0, monthNumber - 1).toLocaleString("en-US", {
      month: "long",
    });
  };
  function getDayName(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }
  const [showTimes, setShowTimes] = useState(false);
  const [dayId, setDayId] = useState<number | null>(null);

  return (
    <>
      {!showTimes ? (
        <div className="bg-gray-800 text-white rounded-xl w-full py-6 shadow-lg z-50 overflow-x-hidden relative">
          <button
            className="absolute text-[30px]"
            onClick={() => {
              onClose();
            }}
          >
            <HighlightOffIcon
              className="ml-5 text-sec cursor-pointer"
              fontSize="large"
            />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center text-[30px]">
            {getMonthNameEn(currentCalender?.month)}
          </h2>
          <p
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, rgba(212, 175, 55, 0.6) -93.46deg, #FFFFFF 216deg, rgba(212, 175, 55, 0.6) 266.54deg, #FFFFFF 576deg)",
              WebkitBackgroundClip: "text",
            }}
            className="text-center text-transparent text-[30px] font-bold mb-3"
          >
            {currentCalender?.year}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 max-h-[500px] overflow-y-auto custom-scrollbar lg:grid-cols-4 xl:grid-cols-5">
            {calenders.map((item) => {
              return (
                <div
                  key={item.id}
                  className=" border-t-2 outline-2 box-content outline-white flex flex-col items-center p-3"
                >
                  <h3 className="text-center text-[20px]">
                    {getDayName(item.date)}
                  </h3>
                  <p
                    className="text-center text-transparent text-[20px]"
                    style={{
                      background:
                        "conic-gradient(from 180deg at 50% 50%, rgba(212, 175, 55, 0.6) -93.46deg, #FFFFFF 216deg, rgba(212, 175, 55, 0.6) 266.54deg, #FFFFFF 576deg)",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {item.date}
                  </p>
                  <div className="my-3">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name={`status-${item.id}`}
                        value="open"
                        className="w-5 h-5 accent-yellow-500" // كبرت الدايرة وخليت اللون ذهبي
                        checked={item.state === "open"}
                        onChange={(e) => calenderStateHandleChange(e, item.id)}
                      />
                      <span className="ml-2">Opened</span>
                    </label>

                    <label className="cursor-pointer ml-5">
                      <input
                        type="radio"
                        name={`status-${item.id}`}
                        value="closed"
                        className="w-5 h-5 accent-yellow-500"
                        checked={item.state === "closed"}
                        onChange={(e) => calenderStateHandleChange(e, item.id)}
                      />
                      <span className="ml-2">Closed</span>
                    </label>
                  </div>

                  <Button
                    newStyles="bg-sec text-black !w-[150px]"
                    onClick={() => {
                      setDayId(item.id);
                      setShowTimes(true);
                    }}
                  >
                    Show Times
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Times
          closeFunc={() => {
            setShowTimes(false);
          }}
          dayId={dayId}
        />
      )}
    </>
  );
};

export default DayPlanner;
