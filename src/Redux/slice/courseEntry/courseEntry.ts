// features/formSlice.ts
import { CourseType } from "@/Components/CourseEntry/CourseEntry";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCourseEntry = CourseType
  

interface TCourseEntryState {
  courseEntries: TCourseEntry[];
}


const initialState: TCourseEntryState = {
  courseEntries: [],
};


export const courseEntrySlice = createSlice({
  name: "courseEntryform",
  initialState,
  reducers: {
    setCourseEntries: (state, action: PayloadAction<TCourseEntry[]>) => {
      state.courseEntries = action.payload;
    },
    addCourseEntry: (state, action: PayloadAction<TCourseEntry>) => {
      state.courseEntries.push(action.payload);
    },
    removeCourseEntry: (state, action: PayloadAction<number>) => {
      state.courseEntries.splice(action.payload, 1);
    },
  },
});


export const { setCourseEntries, addCourseEntry, removeCourseEntry } = courseEntrySlice.actions;
export default courseEntrySlice.reducer;
