import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postData } from "../../../axios/postData";

interface Calender {
  name: string;
  service: number;
  year: number;
  month: number;
  is_available: boolean;
}

// شكل الاستيت العامة
interface CalenderState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CalenderState = {
  loading: false,
  success: false,
  error: null,
};

// thunk لعمل POST
export const createCalender = createAsyncThunk(
  "calender/createCalender",
  async (bookingData: Calender, thunkAPI) => {
    try {
      const response = await postData("services/control-months/", bookingData);
      return response.id; // رجع ID فقط
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "حدث خطأ"
      );
    }
  }
);

const calenderSlice = createSlice({
  name: "calender",
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
      .addCase(createCalender.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createCalender.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createCalender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = calenderSlice.actions;
export default calenderSlice.reducer;
