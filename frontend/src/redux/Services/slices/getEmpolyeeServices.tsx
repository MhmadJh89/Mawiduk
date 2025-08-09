import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getData } from "../../../axios/getData";

export interface EmployeeService {
  id: number;
  name: string;
  employee: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  service: {
    id: number;
    name: string;
    image: null;
  };
  description: "xc";
  price: "34.00";
  image: null;
  opening_time: "06:00:00";
  closing_time: "18:00:00";
  break_start_1: "12:00:00";
  break_end_1: "14:00:00";
  break_start_2: "15:00:00";
  break_end_2: "16:00:00";
  expected_duration: "00:30:00";
  is_available: true;
  day_off_1: null;
  day_off_2: null;
}

interface EmployeeServicesState {
  data: EmployeeService[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeServicesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchEmployeeServices = createAsyncThunk<EmployeeService[]>(
  "employeeServices/fetchEmployeeServices",
  () => getData("services/custom-services/me/")
);

const EmployeeServicesSlice = createSlice({
  name: "employeeServices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeeServices.fulfilled,
        (state, action: PayloadAction<EmployeeService[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchEmployeeServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default EmployeeServicesSlice.reducer;
