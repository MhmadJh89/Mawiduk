import { createSlice } from "@reduxjs/toolkit";

interface stepState {
  step: number;
}
const initialState: stepState = {
  step: 0,
};
const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});
export const { setStep } = stepSlice.actions;
export default stepSlice.reducer;
