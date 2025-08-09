import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../../redux/store";
import {
  fetchTimes,
  type GetTimes,
} from "../../../redux/Services/slices/getTimes";
interface TimesProps {
  dayId: number | null;
  closeFunc: Function;
}
const Times = ({ dayId, closeFunc }: TimesProps) => {
  const times = useSelector<RootState, GetTimes[]>(
    (state) => state.getTimesReducer.data
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTimes(dayId));
  }, [dispatch]);
  return (
    <div className="flex flex-col custom-scrollbar rounded-lg fixed  flex items-center justify-center w-fit z-50 p-4 pr-1 bg-card top-[50%] left-[50%] translate-[-50%]">
      <div className="max-h-[500px] w-full overflow-y-scroll pr-3">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {times.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.state}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.description || "no description provided"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          closeFunc();
        }}
        className="mt-3 self-end mr-6.5 px-5 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:brightness-50 cursor-pointer"
      >
        Close
      </button>
    </div>
  );
};

export default Times;
