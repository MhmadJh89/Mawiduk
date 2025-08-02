import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../../axios/getData";
import type { RootState } from "../../store";

interface Staff {
  id: number;
  name: string;
  service: number;
  description: string;
  price: number;
  expected_duration: string;
}

interface StaffState {
  data: Staff[];
  loading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchStaff = createAsyncThunk<Staff[]>(
  "staff/fetchStaff",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const selectedServiceId = state.serviceId.id;

    const response = await getData(
      `services/custom-services/all/?service=${selectedServiceId}`
    );
    return response;
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStaff.fulfilled,
        (state, action: PayloadAction<Staff[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default staffSlice.reducer;
