import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { sortingReducers } from '../slices/Sorting';

const {
  sortingReducer
} = sortingReducers;

export const store = configureStore({
  reducer: {
    bubbleSort: sortingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
