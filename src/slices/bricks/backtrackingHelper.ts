




export const backtrackingBoard = (len:number) =>{
    const backtrackingBoard: number[][] = new Array(len).fill(-1).map(() => 
    new Array(len).fill(-1)
    );
    backtrackingBoard[0][0] = 0;

    backtrackingBoard[len-1][len-1] = 1;
    return backtrackingBoard;
}