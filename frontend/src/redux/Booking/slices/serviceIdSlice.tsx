import { createSlice } from "@reduxjs/toolkit";

interface serviceIdState {
  id: number | string | null;
  staffId: number | string | null;
  dateId: number | string | null;
  dateInfo: any;
  timeInfo: any;
}

const initialState: serviceIdState = {
  id: null,
  staffId: null,
  dateId: null,
  dateInfo: null,
  timeInfo: null,
};

const servicesSlice = createSlice({
  name: "serviceId",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setStaffId: (state, action) => {
      state.staffId = action.payload;
    },
    setDateId: (state, action) => {
      state.dateId = action.payload;
    },
    setDateInfo: (state, action) => {
      state.dateInfo = action.payload;
    },
    setTimeInfo: (state, action) => {
      state.timeInfo = action.payload;
    },
  },
});

export default servicesSlice.reducer;
export const { setTimeInfo, setDateInfo, setDateId, setId, setStaffId } =
  servicesSlice.actions;
