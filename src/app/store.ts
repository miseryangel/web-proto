import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { sortingReducers } from '../slices/Sorting';
import { arrayReducers } from '../slices/Array';
import { treeReducers } from '../slices/Tree';
import { heapReducers } from '../slices/Heap';
import { backtrackingReducers } from '../slices/Backtracking';

const {
  bstReducer,
  avlReducer,
} = treeReducers;


const {
  arrayReducer,
  queueReducer,
  linkedListReducer,
  stackReducer
} = arrayReducers;

const {
  bubbleSortingReducer,
  mergeSortingReducer,
} = sortingReducers;

const {
  heapReducer,
} = heapReducers;

const {
  backtrackingReducer,
  nQueenReducer,
} = backtrackingReducers;

export const store = configureStore({
  reducer: {
    bubbleSort: bubbleSortingReducer,
    mergeSort:mergeSortingReducer,
    array: arrayReducer,
    queue: queueReducer,
    linkedList: linkedListReducer,
    stack: stackReducer,
    heap: heapReducer,
    bst: bstReducer,
    avl: avlReducer,
    backtracking: backtrackingReducer,
    nQueen:nQueenReducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
