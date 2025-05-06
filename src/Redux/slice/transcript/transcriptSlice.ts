// features/formSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface TTranscript {
  schoolName: string;
  schoolAddress: string;
  studentName: string;
  studentAddress: string;
  dateOfBirth: string;
  graduationDate: string;
  volunteerHours: string;
  awards: string;
  testName: string;
  testScore: string;
  testDate: string;
  schoolLogo: File | null;
}

interface TranscriptState {
  transcript: TTranscript;
}

const initialState: TranscriptState = {
  transcript: {
    schoolName: "",
    schoolAddress: "",
    studentName: "",
    studentAddress: "",
    dateOfBirth: "",
    graduationDate: "",
    volunteerHours: "",
    awards: "",
    testName: "",
    testScore: "",
    testDate: "",
    schoolLogo: null,
  },
};

export const transcriptSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTranscript: (state, action) => {
      state.transcript = action.payload;
    },
    resetTranscript: (state) => {
      state.transcript = initialState.transcript;
    },
  },
});

export const { setTranscript, resetTranscript } = transcriptSlice.actions;
export default transcriptSlice.reducer;

