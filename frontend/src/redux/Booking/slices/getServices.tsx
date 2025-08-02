import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getData } from "../../../axios/getData";

interface Service {
  image: string | undefined;
  id: number;
  name: string;
  description: string;
}

interface ServicesState {
  data: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk<Service[]>(
  "services/fetchServices",
  () => getData("services/all/")
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchServices.fulfilled,
        (state, action: PayloadAction<Service[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default servicesSlice.reducer;
