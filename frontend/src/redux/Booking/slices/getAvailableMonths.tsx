import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../../../axios/getData";
import type { RootState } from "../../store";

interface AvailableMonths {
  date: string | number | Date;
  id: number;
  name: string;
  service: number;
  year: number;
  month: number;
  is_available: boolean;
}

interface AvailableMonthsState {
  data: AvailableMonths[];
  loading: boolean;
  error: string | null;
}

const initialState: AvailableMonthsState = {
  data: [],
  loading: false,
  error: null,
};

// export const fetchAvailableMonths = createAsyncThunk<AvailableMonths[]>(
//   "availableMonths/fetchAvailableMonths",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState() as RootState;
//     const staffId = state.serviceId.staffId;
//     const response = await getData(`services/available-days/?month=${staffId}`);
//     return response;
//   }
// );

export const fetchAvailableMonths = createAsyncThunk<AvailableMonths[]>(
  "availableMonths/fetchAvailableMonths",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const staffId = state.serviceId.staffId;
    console.log("Fetching for staffId:", staffId); // ✅ دا أول تتبع مهم

    // أولاً: هات الشهور المتاحة
    const availableMonthsInfo = await getData(
      `services/available-months/?custom_service=${staffId}`
    );
    console.log("Months Info:", availableMonthsInfo); // ✅ تتبع الـ API الأول

    const availableMonths = availableMonthsInfo.map(
      (item: { id: number }) => item.id
    );

    let allDates: AvailableMonths[] = [];

    for (const id of availableMonths) {
      const response = await getData(`services/available-days/?month=${id}`);

      allDates = allDates.concat(response);
    }

    return allDates;
  }
);
const availableMonthsSlice = createSlice({
  name: "availableMonths",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableMonths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAvailableMonths.fulfilled,
        (state, action: PayloadAction<AvailableMonths[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAvailableMonths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default availableMonthsSlice.reducer;
