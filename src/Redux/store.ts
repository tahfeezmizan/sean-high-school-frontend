/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { baseApi } from "./apis/baseApi";
import authReducer from "./slice/auth/authSlice";
import  transcriptReducer  from "./slice/transcript/transcriptSlice";
import  courseEntryReducer  from "./slice/courseEntry/courseEntry";
import  gradeScaleReducer  from "./slice/gradeScale/gradeScale";





const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any): Promise<any> {
      return Promise.resolve(value);
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};


const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "auth",
  storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedTranscriptReducer = persistReducer(
  persistConfig,
  transcriptReducer
);

const persistedCourseEntryReducer = persistReducer(
  persistConfig,
  courseEntryReducer
);


const persistedGradeScaleReducer = persistReducer(
  persistConfig,
  gradeScaleReducer
);





export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: persistedAuthReducer,
      transcript: persistedTranscriptReducer,
      courseEntry: persistedCourseEntryReducer,
      gradeScale: persistedGradeScaleReducer
    },

    
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
};




export const store = makeStore();
export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];