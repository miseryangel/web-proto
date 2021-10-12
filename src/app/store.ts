import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { sortingReducers } from '../slices/Sorting';
import { arrayReducers } from '../slices/Array';
import { treeReducers } from '../slices/Tree';
import { heapReducers } from '../slices/Heap';
import { backtrackingReducers } from '../slices/Backtracking';
import { pathFindingReducers } from '../slices/PathFinding';

const {
  bstReducer,
  avlReducer,
  redBlackReducer,
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
  quickSortingReducer,
  radixSortingReducer,
} = sortingReducers;

const {
  heapReducer,
} = heapReducers;

const {
  backtrackingReducer,
  nQueenReducer,
} = backtrackingReducers;

const {
  bfsReducer,
} = pathFindingReducers

export const store = configureStore({
  reducer: {
    bubbleSort: bubbleSortingReducer,
    mergeSort:mergeSortingReducer,
    quickSort: quickSortingReducer,
    radixSort: radixSortingReducer,
    array: arrayReducer,
    queue: queueReducer,
    linkedList: linkedListReducer,
    stack: stackReducer,
    heap: heapReducer,
    bst: bstReducer,
    avl: avlReducer,
    redBlack:redBlackReducer,
    backtracking: backtrackingReducer,
    nQueen:nQueenReducer,
    bfs:bfsReducer,
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
