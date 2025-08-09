import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getData } from "../../../axios/getData";

export interface Calender {
  id: number;
  name: string;
  service: number;
  year: number;
  month: number;
  is_available: boolean;
}

interface CalenderState {
  data: Calender[];
  loading: boolean;
  error: string | null;
}

const initialState: CalenderState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCalenders = createAsyncThunk<Calender[], number>(
  "getCalenders/fetchCalenders",
  (serviceId) =>
    getData(`services/custom-services-months/?custom_service=${serviceId}`)
);

const Calender = createSlice({
  name: "getCalenders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalenders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCalenders.fulfilled,
        (state, action: PayloadAction<Calender[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchCalenders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default Calender.reducer;
