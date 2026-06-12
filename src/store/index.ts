import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import filterReducer from './slices/filterSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    filter: filterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
