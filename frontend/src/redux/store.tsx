import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./Booking/slices/stepSlice";
import servicesReducer from "./Booking/slices/getServices";
import staffReducer from "./Booking/slices/getStaff";
import serviceIdReducer from "./Booking/slices/serviceIdSlice";
import availableMonthsReducer from "./Booking/slices/getAvailableMonths";
import availableTimesReducer from "./Booking/slices/getAvailableTimes";
export const store = configureStore({
  reducer: {
    step: stepReducer,
    services: servicesReducer,
    staff: staffReducer,
    serviceId: serviceIdReducer,
    availableMonths: availableMonthsReducer,
    availableTimes: availableTimesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
