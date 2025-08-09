import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getData } from "../../../axios/getData";

export interface GetTimes {
  id: number;
  day: number;
  time: string;
  state: string;
  description: string | null;
}

interface GetTimesState {
  data: GetTimes[];
  loading: boolean;
  error: string | null;
}

const initialState: GetTimesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTimes = createAsyncThunk<GetTimes[], number | null>(
  "getTimes/fetchTimes",
  (dayId) => getData(`services/control-appointments/?day=${dayId}`)
);

const GetTimesSlice = createSlice({
  name: "getTimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTimes.fulfilled,
        (state, action: PayloadAction<GetTimes[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default GetTimesSlice.reducer;
