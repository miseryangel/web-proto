import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { randomArray } from './bricks/arrayGenerator';
import { Heap } from './bricks/heapGenerator';
import { MAX_HEAP, MIN_HEAP } from './bricks/symbol';

const initialLength = 15;

export const heapSlice = createSlice({
    name: 'heap',
    initialState: {
        heap:new Heap(randomArray(initialLength),MAX_HEAP),
        len: initialLength,
        type: MAX_HEAP,
    },
    reducers: {
        reset: {
            reducer(state,action:PayloadAction<number>){
                action.payload === 0?state.heap = new Heap(randomArray(state.len),MAX_HEAP):state.heap = new Heap(randomArray(state.len),MIN_HEAP);
            },
            prepare(payload:number){
                return {payload};
            },
        },
        resize: {
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        add: {
            reducer(state,action:PayloadAction<number>){
                state.heap.add(action.payload);
                state.len++;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        remove: (state) =>{
            state.heap.remove();
            state.len--;
        },        
        transform:{
            reducer(state,action:PayloadAction<number[]>){
                state.len = action.payload.length;
                state.heap = new Heap([...action.payload],MAX_HEAP);
            },
            prepare(payload:number[]){
                return {payload};
            },
        }
    },
})

export const {
    add: heapAdd,
    remove: heapRemove,
    reset: heapReset,
    resize: heapResize,
    transform: heapTransform,
} = heapSlice.actions;

export const heapReducers = {
    heapReducer:heapSlice.reducer,
}