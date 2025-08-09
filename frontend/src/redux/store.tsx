import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./Booking/slices/stepSlice";
import servicesReducer from "./Booking/slices/getServices";
import staffReducer from "./Booking/slices/getStaff";
import serviceIdReducer from "./Booking/slices/serviceIdSlice";
import availableMonthsReducer from "./Booking/slices/getAvailableMonths";
import availableTimesReducer from "./Booking/slices/getAvailableTimes";
import employeeServices from "./Services/slices/getEmpolyeeServices";
import calenderReducer from "./Services/slices/createCalender";
import getDaysReducer from "./Services/slices/getDays";
import updateCalenderAvReducer from "./Services/slices/updateCalenderState";
import getCalendersReducer from "./Services/slices/getCalenders";
import getTimesReducer from "./Services/slices/getTimes";
export const store = configureStore({
  reducer: {
    step: stepReducer,
    services: servicesReducer,
    staff: staffReducer,
    serviceId: serviceIdReducer,
    availableMonths: availableMonthsReducer,
    availableTimes: availableTimesReducer,
    employeeServices: employeeServices,
    calenderReducer: calenderReducer,
    getCalendersReducer: getCalendersReducer,
    getDaysReducer: getDaysReducer,
    updateCalenderAvReducer: updateCalenderAvReducer,
    getTimesReducer: getTimesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
