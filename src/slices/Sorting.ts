import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { randomArray } from './bricks/arrayGenerator';
import { stackGenerator,subSort } from './bricks/mergeHelper';
import { radixGenerator, radixSort } from './bricks/radixSortHelper';

const initialLength = 100;

export const bubbleSortingSlice = createSlice({
    name: 'bubble sort',
    initialState: {
        arr:randomArray(initialLength),
        len:initialLength,
        round:0,
        idx: 0,
        isOver:false,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(initialLength);
            state.len = initialLength;
            state.round = 0;
            state.idx = 0;
            state.isOver = false;
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                if (action.payload === 1){
                    state.len++;
                }else{
                    state.len--;
                }
                state.arr = randomArray(state.len);
                state.round = 0;
                state.idx = 0;
                state.isOver = false;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        forward:(state) =>{
            console.log("whyyy",state.isOver);
            console.log("The location is",state.idx);
            console.log("The round is",state.round);
            if (!state.isOver){
                if (state.round === state.len - 1){
                    state.isOver = true;
                    return;
                }
                if (state.idx === state.len - state.round - 1){
                    state.idx = 0;
                    state.round++;
                }else{
                    if (state.arr[state.idx] > state.arr[state.idx + 1]){
                        const tmp = state.arr[state.idx];
                        state.arr[state.idx] = state.arr[state.idx + 1];
                        state.arr[state.idx + 1] = tmp;
                    }
                    state.idx++;
                }
            }
        }
            
    },
})


const mergeStart = randomArray(initialLength);
const stack = stackGenerator(initialLength);
export const mergeSortingSlice = createSlice({
    name: 'merge sort',
    initialState: {
        arr:mergeStart,
        tmp:mergeStart,
        stack:stack,
        len:initialLength,
        round:stack.length-1,
        idx: stack[stack.length-1][0],
        isOver:false,
    },
    reducers: {
        reset :{
            reducer(state,action:PayloadAction<{arr:number[],stack:number[][]}>){
                state.arr = action.payload.arr;
                state.tmp = state.arr;
                state.stack = action.payload.stack;
                state.round = state.stack.length-1;
                state.idx = state.stack[state.stack.length-1][0];
                state.isOver = false;
            },
            prepare(payload:{arr:number[],stack:number[][]}){
                return {payload};
            },
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        update:{
            reducer(state,action:PayloadAction<number[]>){
                console.log("the length of subsort is ",action.payload.length);
                state.tmp = [...action.payload];
                state.arr[state.idx] = state.tmp[state.idx];
                state.idx++;
            },
            prepare(payload:number[]){
                return {payload};
            },
        },
        forward:(state) =>{
            console.log("isOver?",state.isOver);
            console.log("the location",state.idx);
            if (!state.isOver){
                if (state.idx === state.stack[state.round][0]){
                    return;
                }
                state.arr[state.idx] = state.tmp[state.idx];
                if (state.idx === state.stack[state.round][1]){
                    state.round--;
                    if (state.round === -1){
                        state.isOver = true;
                        return;
                    }
                    state.idx = state.stack[state.round][0];
                }else{
                    state.idx++;
                }
            }
        }
    },
})

const quickSortInitialArray = randomArray(initialLength);
export const quickSortingSlice = createSlice({
    name: 'quick sort',
    initialState: {
        arr:quickSortInitialArray,
        len:initialLength,
        stack:[[-1,0,0,initialLength-1,quickSortInitialArray[initialLength-1]]] as number[][],
        pivots: [] as number[],
        isOver:false,
    },
    reducers: {
        reset: state =>{
            state.arr = randomArray(state.len);
            state.stack = [[-1,0,0,state.len-1]];
            state.pivots = [];
            state.isOver = false;
        },
        resize:{
            reducer(state,action:PayloadAction<number>){
                state.len = action.payload;
            },
            prepare(payload:number){
                return {payload};
            },
        },
        forward:(state) =>{
            if (!state.isOver){
                if (state.stack.length === 0){
                    state.isOver = true;
                    return;
                }
                const nxtQueue = [] as number[][];
                const stack = [...state.stack];
                stack.map((sd) =>{
                    console.log("this is undefined",sd);
                    let nxt = sd[0], cur = sd[1], low = sd[2], high = sd[3], ele = sd[4];
                    if (high === cur){
                        const tmp = state.arr[nxt+1];
                        state.arr[nxt+1] = ele;
                        state.arr[high] = tmp;
                        if (nxt > low){
                            nxtQueue.push([low-1,low,low,nxt,state.arr[nxt]]);
                        }
                        if (nxt + 2 < high){
                            nxtQueue.push([nxt+1,nxt+2,nxt+2,high,state.arr[high]]);
                        }
                        state.pivots.push(nxt+1);
                    }else{
                        if (state.arr[cur] <= ele){
                            nxt++;
                            const tmp = state.stack[nxt];
                            state.stack[nxt] = state.stack[cur];
                            state.stack[cur] = tmp;
                        }
                        nxtQueue.push([nxt,++cur,low,high,ele]);
                    }
                    return 0;
                })
                // for (let i = 0; i < state.stack.length; i++){
                //     console.log("this is undefined",state.stack[i]);
                //     let sd = [...state.stack[i]], nxt = sd[0], cur = sd[1], low = sd[2], high = sd[3], ele = sd[4];
                //     if (high === cur){
                //         state.arr[nxt+1] = ele;
                //         if (nxt > low){
                //             nxtQueue.push([low-1,low,low,nxt,state.arr[nxt]]);
                //         }
                //         if (nxt + 2 < high){
                //             nxtQueue.push([nxt+1,nxt+2,nxt+2,high,state.arr[high]]);
                //         }
                //         state.pivots.push(nxt+1);
                //     }else{
                //         if (state.arr[cur] <= ele){
                //             nxt++;
                //             const tmp = state.stack[nxt];
                //             state.stack[nxt] = state.stack[cur];
                //             state.stack[cur] = tmp;
                //         }
                //         nxtQueue.push([nxt,++cur,low,high,ele]);
                //     }
                // }
                state.stack = [...nxtQueue];
            }
        }
            
    },
})

const radixInitialWordLength = 10;
const radixInitialLength = 6;
const radixArray = radixGenerator(radixInitialWordLength,radixInitialLength);
export const radixSortingSlice = createSlice({
    name: 'radix sort',
    initialState: {
        arr: radixArray,
        wordLength: radixInitialWordLength,
        len: radixInitialLength,
        idx: radixInitialWordLength-1,
        isOver:false,
    },
    reducers: {
        reset: state =>{
            state.arr = radixGenerator(state.wordLength,state.len);
            state.idx = state.wordLength - 1;
            state.isOver = false;
        },
        resize:{
            reducer(state,action:PayloadAction<{wordLen:number,len:number}>){
                console.log("this is resize payload",action.payload);
                state.wordLength = action.payload.wordLen;
                state.len = action.payload.len;
            },
            prepare(payload:{wordLen:number,len:number}){
                return {payload};
            },
        },
        forward:(state) =>{
            console.log(state.idx);
            if (state.idx === -1){
                state.isOver = true;
            }else{
                state.arr = [...radixSort([...state.arr],state.idx)];
                state.idx--;
                console.log(state.arr);
            }
        } 
    },
})

export const {
    reset:bubbleReset,
    resize:bubbleResize,
    forward:bubbleForward,
} = bubbleSortingSlice.actions;

export const {
    reset:mergeReset,
    resize:mergeResize,
    forward:mergeForward,
    update:mergeUpdate,
} = mergeSortingSlice.actions;

export const {
    reset:quickReset,
    resize:quickResize,
    forward:quickForward,
} = quickSortingSlice.actions;

export const {
    reset:radixReset,
    resize:radixResize,
    forward:radixForward,
} = radixSortingSlice.actions;

export const sortingReducers ={
    bubbleSortingReducer: bubbleSortingSlice.reducer,
    mergeSortingReducer: mergeSortingSlice.reducer,
    quickSortingReducer: quickSortingSlice.reducer,
    radixSortingReducer: radixSortingSlice.reducer,
}