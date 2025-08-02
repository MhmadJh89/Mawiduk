import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../../axios/getData";
import type { RootState } from "../../store";

interface AvailableTimes {
  id: number;
  day: number;
  time: string;
  state: string;
  description: string | null;
}

interface AvailableTimesState {
  data: AvailableTimes[];
  loading: boolean;
  error: string | null;
}

const initialState: AvailableTimesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchAvailableTimes = createAsyncThunk<AvailableTimes[]>(
  "availableTimes/fetchAvailableTimes",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedDateId = state.serviceId.dateId;

    const response = await getData(
      `services/appointments/?day=${selectedDateId}`
    );
    return response;
  }
);

const availableTimesSlice = createSlice({
  name: "availableTimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAvailableTimes.fulfilled,
        (state, action: PayloadAction<AvailableTimes[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAvailableTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default availableTimesSlice.reducer;
