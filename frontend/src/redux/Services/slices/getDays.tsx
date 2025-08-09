import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getData } from "../../../axios/getData";

export interface GetDays {
  id: number;
  date: string;
  state: string;
}

interface GetDaysState {
  data: GetDays[];
  loading: boolean;
  error: string | null;
}

const initialState: GetDaysState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDays = createAsyncThunk<GetDays[], number>(
  "getDays/fetchDays",
  (newCalendarId) =>
    getData(`services/control-days/?calendar_month=${newCalendarId}`)
);

const getDaysSlice = createSlice({
  name: "getDays",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDays.fulfilled,
        (state, action: PayloadAction<GetDays[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchDays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default getDaysSlice.reducer;
