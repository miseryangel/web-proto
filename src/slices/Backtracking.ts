import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { backtrackingBoard } from './bricks/backtrackingHelper';
import { nQueueGenerator } from './bricks/nQueenHelper';
  
const initialNQueenWidth = 7;
const {records,dp} = nQueueGenerator(initialNQueenWidth);

const nQueenSlice = createSlice({
  name:"nQueen",
  initialState:{
    length:initialNQueenWidth,
    records:records,
    dp:dp,
    isOn:false,
    isOver:false,
    idx:0,
    position:0,
  },
  reducers:{
    resize:{
      reducer(state,action:PayloadAction<number>){
        action.payload === 0?state.length--:state.length++;
      },
      prepare(payload:number){
        return {payload};
      }
    },
    reset:(state)=>{
      state.idx = 0;
      state.isOver = false;
      state.position = 0;
      const {records,dp} = nQueueGenerator(state.length);
      state.records = records;
      state.dp = dp;
    },
    backward:(state) =>{
      if (state.idx === records.length - 1){
        state.isOver = true;
      }
      if (state.isOver){
        if (state.position > 0) state.position--;
      }else{
        if (state.idx > 0) state.idx--;
      }
    },
    forward:(state) =>{
      if (state.idx === records.length - 1){
        state.isOver = true;
      }
      if (state.isOver){
        if (state.position < dp.length - 1) state.position++;
      }else{
        if (state.idx < records.length - 1) state.idx++;
      }
    },
  }
});


const backBoardLen = 10;
const dir = [[0,1],[1,0],[0,-1],[-1,0]];

const backtrackingSlice = createSlice({
  name:"backtracking",
  initialState:{
    length:backBoardLen,
    board:backtrackingBoard(backBoardLen),
    path: [] as Array<{r:number,c:number,d:number}>,
    hasBegun: false,
    startPoint: {r:0,c:0},
    endPoint: {r:backBoardLen-1,c:backBoardLen-1},
    isOver:false,
  },
  reducers:{
    reScale:{
      reducer(state,action:PayloadAction<number>){
          if (action.payload === 1){
            state.length++;
          }else{
            state.length--;
          }
          state.board = backtrackingBoard(state.length);
          state.path = [];
          state.startPoint = {r:0,c:0};
          state.endPoint= {r:state.length-1,c:state.length-1};
          state.hasBegun = false;
          state.isOver = false;
      },
      prepare(payload:number){
          return {payload};
      },
    },
    obsReset: state => {
      state.board = backtrackingBoard(state.length);
      state.path = [];
      state.startPoint = {r:0,c:0};
      state.endPoint= {r:state.length-1,c:state.length-1};
      state.hasBegun = false;
      state.isOver = false;
    },
    addObs:{
      reducer(state,action:PayloadAction<{r:number,c:number}>){
        if (state.board[action.payload.r][action.payload.c] === -1)
          state.board[action.payload.r][action.payload.c] = 2;
      },
      prepare(payload:{r:number,c:number}){
          return {payload};
      },
    },
    chooseStartPoint:{
      reducer(state,action:PayloadAction<{r:number,c:number}>){
          if (state.endPoint !== null && state.endPoint.r === action.payload.r && state.endPoint.c === action.payload.c){
            alert("Start point must be different from end point!");
            return;
          }
          if (state.board[action.payload.r][action.payload.c] === 2){
            return;
          }
          if (state.startPoint !== null){
            state.board[state.startPoint.r][state.startPoint.c] = -1;
          }
          state.board[action.payload.r][action.payload.c] = 0;
          state.startPoint = {r:action.payload.r,c:action.payload.c};
      },
      prepare(payload:{r:number,c:number}){
          return {payload};
      },
    },
    chooseEndPoint:{
      reducer(state,action:PayloadAction<{r:number,c:number}>){
          if (state.startPoint !== null && state.startPoint.r === action.payload.r && state.startPoint.c === action.payload.c){
            alert("End point must be different from start point!");
            return;
          }
          if (state.board[action.payload.r][action.payload.c] === 2){
            return;
          }
          if (state.endPoint !== null){
            state.board[state.endPoint.r][state.endPoint.c] = -1;
          }
          state.board[action.payload.r][action.payload.c] = 1;
          state.endPoint = {r:action.payload.r,c:action.payload.c};
      },
      prepare(payload:{r:number,c:number}){
          return {payload};
      },
    },
    begin: state => {
      state.hasBegun = true;
      const {r,c} = state.startPoint, d = 0;
      state.path.push({r,c,d});
    },
    forward:
      (state) =>{
        if (state.isOver) return;
        if (state.path.length === 0 || (state.path[state.path.length-1].r === state.endPoint.r && state.path[state.path.length-1].c === state.endPoint.c )){
          state.isOver = true;
          return;
        }
        const cr = state.path[state.path.length-1].r, cc = state.path[state.path.length-1].c, cd = state.path[state.path.length-1].d++;
        // has exhausted all directions
        if (cd === 4){
          if (!(cr === state.startPoint.r && cc === state.startPoint.c)) state.board[cr][cc] = 3;
          state.path.pop();
          return;
        }
        const nr = cr + dir[cd][0], nc = cc + dir[cd][1];
        if (nr < 0 || nr >= state.length || nc < 0 || nc >= state.length || state.board[nr][nc] > 1 || state.board[nr][nc] === 0) return;
        if (!(nr === state.endPoint.r && nc === state.endPoint.c) && !(nr === state.startPoint.r && nc === state.startPoint.c)){
          state.board[nr][nc] = 4;
        }
        state.path.push({r:nr,c:nc,d:0});
      }
    ,
  }
});


export const {
  resize:nQResize,
  backward:nQBackward,
  forward:nQFoward,
  reset:nQReset,
} = nQueenSlice.actions;

export const {
  reScale,
  obsReset,
  addObs,
  chooseStartPoint,
  chooseEndPoint,
  begin,
  forward:obsforward,
} = backtrackingSlice.actions;

export const backtrackingReducers ={
  nQueenReducer: nQueenSlice.reducer,
  backtrackingReducer: backtrackingSlice.reducer,
}