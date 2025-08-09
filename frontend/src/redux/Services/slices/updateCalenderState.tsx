import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postData } from "../../../axios/postData";
import { patchData } from "../../../axios/patchData";

interface upadateCalenderAv {
  id: number;
  state: "open" | "closed";
}

// شكل الاستيت العامة
interface upadateCalenderAvState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: upadateCalenderAvState = {
  loading: false,
  success: false,
  error: null,
};

export const updateCalenderAvFunc = createAsyncThunk(
  "updateCalendar/state",
  async ({ id, state }: upadateCalenderAv) => {
    const response = await patchData(`services/control-days/${id}/`, { state });
    return response;
  }
);

const upadateCalenderAvSlice = createSlice({
  name: "UpdateCalenderAv",
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
      .addCase(updateCalenderAvFunc.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateCalenderAvFunc.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCalenderAvFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = upadateCalenderAvSlice.actions;
export default upadateCalenderAvSlice.reducer;
