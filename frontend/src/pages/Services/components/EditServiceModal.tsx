import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import type { EmployeeService } from "../../../redux/Services/slices/getEmpolyeeServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../../redux/store";
import { createCalender } from "../../../redux/Services/slices/createCalender";

import DayPlanner from "./DayPlanner";
import {
  fetchCalenders,
  type Calender,
} from "../../../redux/Services/slices/getCalenders";
import { fetchDays } from "../../../redux/Services/slices/getDays";
interface EditServiceModalProps {
  onClose: () => void;
  service: EmployeeService;
}

const EditServiceModal: React.FC<EditServiceModalProps> = ({
  onClose,
  service,
}) => {
  const [currentCalender, setCurrentCalender] = useState<Calender | null>(null);

  const [selectedCalendarId, setSelectedCalendarId] = useState<number | null>(
    null
  );
  const [calendarName, setCalendarName] = useState("");
  const [calendarMonth, setCalendarMonth] = useState("");
  const [calendarYear, setCalendarYear] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [showAddCalender, setShowAddCalender] = useState<boolean>(false);
  const [showEditService, setShowEditService] = useState<boolean>(true);
  const [showDayPlanner, setShowDayPlanner] = useState<boolean>(false);

  const calenders = useSelector<RootState, Calender[]>(
    (state) => state.getCalendersReducer.data
  );
  useEffect(() => {
    dispatch(fetchCalenders(service.id));
  }, [dispatch]);
  const getMonthNameEn = function (monthNumber: number): string {
    return new Date(0, monthNumber - 1).toLocaleString("en-US", {
      month: "long",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-black opacity-80 w-full h-full z-40 absolute"></div>
      {showAddCalender ? (
        <div className="bg-gray-800 text-white rounded-xl w-full max-w-md p-6 shadow-lg z-50">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create a calender
          </h2>

          {/* Calender Name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Calender Name
            </label>
            <input
              type="text"
              value={calendarName}
              onChange={(e) => setCalendarName(e.target.value)}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          {/* Year & Month */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Month</label>
              <input
                type="text"
                value={calendarMonth}
                onChange={(e) => setCalendarMonth(e.target.value)}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Year</label>
              <input
                type="text"
                value={calendarYear}
                onChange={(e) => setCalendarYear(e.target.value)}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={async () => {
                const result = await dispatch(
                  createCalender({
                    name: calendarName,
                    service: service.id,
                    year: +calendarYear,
                    month: +calendarMonth,
                    is_available: false,
                  })
                );

                // لو العملية نجحت
                if (createCalender.fulfilled.match(result)) {
                  const newCalendarId = result.payload;

                  // استدعاء الأيام
                  dispatch(fetchDays(newCalendarId));

                  // تحديد currentCalender (لو عندك قائمة كل التقويمات calenders):
                  const newCalender = calenders.find(
                    (cal) => cal.id === newCalendarId
                  );
                  if (newCalender) {
                    setCurrentCalender(newCalender);
                  }

                  setShowDayPlanner(true);
                  setShowAddCalender(false);
                }
              }}
              className="px-5 py-2 text-sm font-medium text-black bg-sec rounded-lg hover:brightness-50 cursor-pointer"
            >
              Create
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:brightness-50 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      ) : showEditService ? (
        <div className="bg-gray-800 text-white rounded-xl w-full max-w-md p-6 shadow-lg z-50 overflow-y-auto max-h-[80vh] custom-scrollbar">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Service Details
          </h2>

          {/* Service Name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Service Name
            </label>
            <input
              readOnly
              type="text"
              value={service.service.name}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Price</label>
              <input
                readOnly
                type="text"
                value={service.price}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Duration</label>
              <input
                readOnly
                type="text"
                value={service.expected_duration}
                className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Status</label>
            <select
              disabled
              value={service.is_available ? "active" : "inactive"}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Calender */}
          <div className="mb-6 w-full bg-main rounded-lg p-4 items-center text-black">
            <div className="grid grid-cols-3 gap-1">
              {calenders.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      dispatch(fetchDays(item.id)); // ✅ جلب الأيام
                      setSelectedCalendarId(item.id); // ✅ تحديد الـ ID
                      setCurrentCalender(item); // ✅ إصلاح المشكلة
                      setShowDayPlanner(true); // ✅ عرض المخطط
                      setShowEditService(false); // ✅ إخفاء صفحة الخدمة
                    }}
                    className=" bg-white rounded-lg flex flex-col items-center p-1 cursor-pointer hover:brightness-90 transition"
                  >
                    <div className="w-[50px] h-[50px] rounded-full bg-main text-sec flex justify-center items-center ">
                      <CalendarMonthIcon fontSize="medium" />
                    </div>
                    <h5 className="font-bold">{getMonthNameEn(+item.month)}</h5>
                    <span>{item.year}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center ml-3 gap-2 m-5">
              <button
                onClick={() => {
                  setShowAddCalender(true);
                  setShowEditService(false);
                }}
                className="cursor-pointer w-[50px] h-[50px] rounded-full bg-white  text-sec flex justify-center items-center "
              >
                <AddCircleOutlineIcon />
              </button>
              <p className="text-white">Add a Service</p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="cursor-pointer px-5 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      ) : showDayPlanner ? (
        <DayPlanner
          currentCalender={currentCalender}
          calendarId={selectedCalendarId}
          onClose={onClose}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EditServiceModal;
