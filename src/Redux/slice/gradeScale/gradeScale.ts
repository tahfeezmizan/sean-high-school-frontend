// features/formSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface TGradeScale {
    name: string,
    title: string,
    signature: string,
    dates: string
}


interface TGradeScaletate {
  gradeScale: TGradeScale;
}


const initialState: TGradeScaletate = {

  gradeScale: {
    name: "",
    title: "",
    signature: "",
    dates: ""
  },

};






export const gradeScaleSlice = createSlice({
  name: "gradeScaleform",
  initialState,
  reducers: {
    setGradeScale: (state, action) => {
      state.gradeScale = action.payload;
    },
  },
});




export const { setGradeScale } = gradeScaleSlice.actions;
export default gradeScaleSlice.reducer;