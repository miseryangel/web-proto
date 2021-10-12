import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";

const initialHeight = 10, initialWidth = 15;
const boardGenerator = (height:number,width:number) =>{
  const board: number[][] = new Array(height).fill(-1).map(() => 
    new Array(width).fill(-1)
  );
  board[0][0] = 0;
  board[height-1][width-1] = 1;
  return board;
}
const dir = [[0,1],[1,0],[0,-1],[-1,0]];

const bfsSlice = createSlice({
    name:"breadth first search",
    initialState:{
        height:initialHeight,
        width:initialWidth,
        board:boardGenerator(initialHeight,initialWidth),
        hasBegun: false,
        startPoint: [0,0],
        endPoint: [initialHeight-1,initialWidth-1],
        path: [] as Array<{r:number,c:number}>,
        isOver:false,
    },
    reducers:{
        resize:{
            reducer(state,action:PayloadAction<{height:number,width:number}>){
                state.height = action.payload.height;
                state.width = action.payload.width;
            },
            prepare(payload:{height:number,width:number}){
                return {payload};
            },
        },
        reset:(state) =>{
            state.board = boardGenerator(state.height,state.width);
            state.path = [];
            state.hasBegun = false;
            state.isOver = false;
            state.startPoint = [0,0];
            state.endPoint = [state.height-1,state.width-1];
        },
        addObs:{
            reducer(state,action:PayloadAction<{r:number,c:number}>){
                state.board[action.payload.r][action.payload.c] = 2;
            },
            prepare(payload:{r:number,c:number}){
                return {payload};
            },
        },
        chooseStartPoint:{
            reducer(state,action:PayloadAction<{r:number,c:number}>){
                state.board[state.startPoint[0]][state.startPoint[1]] = -1;
                state.board[action.payload.r][action.payload.c] = 0;
                state.startPoint = [action.payload.r,action.payload.c];
            },
            prepare(payload:{r:number,c:number}){
                return {payload};
            },
        },
        chooseEndPoint:{
            reducer(state,action:PayloadAction<{r:number,c:number}>){
                state.board[state.endPoint[0]][state.endPoint[1]] = -1;
                state.board[action.payload.r][action.payload.c] = 1;
                state.endPoint = [action.payload.r,action.payload.c];
            },
            prepare(payload:{r:number,c:number}){
                return {payload};
            },
        },
        begin: state => {
            state.hasBegun = true;
            state.path.push({r:state.startPoint[0],c:state.startPoint[1]});
        },
        forward:(state) =>{
            if (state.isOver) return;
            if (state.path.length === 0){
                state.isOver = true;
                return;
            }
            const frontier: Array<{r:number,c:number}> = [];
            while (state.path.length !== 0){
                const cur = state.path.pop();
                const cr = cur!.r, cc = cur!.c;
                if (state.board[cr][cc] === 1 || state.board[cr][cc] > 4){
                    state.isOver = true;
                    return;
                }
                for (let i = 0; i < 4; i++){
                    const nr = cr + dir[i][0], nc = cc + dir[i][1];
                    if (nr >= 0 && nr < state.height && nc >= 0 && nc < state.width && (state.board[nr][nc] === -1 || state.board[nr][nc] === 1 || state.board[nr][nc] > 4)){
                        if (!(nr === state.endPoint[0] && nc === state.endPoint[1]) && !(nr === state.startPoint[0] && nc === state.startPoint[1])){
                            state.board[nr][nc] = 3;
                        }
                        frontier.push({r:nr,c:nc});
                    }
                }
            }
            state.path = frontier;
        },
    }
});

  
export const {
    resize:bfsResize,
    reset:bfsReset,
    addObs:bfsAddObs,
    chooseStartPoint:bfsChooseStartPoint,
    chooseEndPoint:bfsChooseEndPoint,
    begin:bfsBegin,
    forward:bfsForward,
} = bfsSlice.actions;

export const pathFindingReducers ={
    bfsReducer: bfsSlice.reducer,
}