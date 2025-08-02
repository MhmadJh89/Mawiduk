import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postData } from "../../../axios/postData";

interface BookingData {
  date_time: number | string | null;
  service: number | string | null;
  note: string;
}

// شكل الاستيت العامة
interface BookingState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: BookingState = {
  loading: false,
  success: false,
  error: null,
};

// thunk لعمل POST
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: BookingData, thunkAPI) => {
    try {
      const response = await postData("appointments/bookings/", bookingData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "حدث خطأ"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = bookingSlice.actions;
export default bookingSlice.reducer;
