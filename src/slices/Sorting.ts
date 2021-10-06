import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min:number, max:number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
const randomArray = (len:number) =>{
    const arr = [];
    for (let i = 0; i < len; i++){
        arr[i] = randomIntFromInterval(1,100);
    }
    return arr;
}

const initialLength = 100, maxLength = 200;

export const sortingSlice = createSlice({
    name: 'sorting',
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


export const {
    reset:bubbleReset,
    resize:bubbleResize,
    forward:bubbleForward,
} = sortingSlice.actions;

export const sortingReducers ={
    sortingReducer: sortingSlice.reducer,
}