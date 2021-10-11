import React,{useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { nQResize, nQBackward, nQFoward, nQReset} from '../../slices/Backtracking';
import { Typography, Box, Grid, Button, Paper, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { nQueenStyles } from '../styles/nQueenStyle';
import play from '../../assets/play_arrow_black_24dp.svg';
import pause from '../../assets/pause_black_24dp.svg';
import fastForward from '../../assets/fast_forward_black_24dp.svg';
import backward from '../../assets/skip_previous_black_24dp.svg';
import queen from '../../assets/QUEEN-CHESS.svg';

function Tiles(props:{board:number[][]}){
  let tiles = [];
  const classes = nQueenStyles();
  for (let i = 0; i < props.board.length; i++){
    let row = [];
    for (let j = 0; j < props.board[0].length; j++){
      switch(props.board[i][j]){
        case -1:
          row.push(<Paper className= {(i+j)%2 === 0?classes.even:classes.odd} ></Paper>);
          break;
        case 0:
          row.push(<Paper className= {classes.chosen} >
                        {"?"}
                    </Paper>);
          break;
        case 1:
          row.push(<Paper className= {classes.queen}>
                        <Icon classes={{root: classes.iconRoot}}>
                            <img className={classes.imageIcon} src = {queen} alt = "Queen" />
                        </Icon>
                    </Paper>);
      }
    }
    tiles.push(<Grid container  alignItems="center" justifyContent="center">
                    <div className={classes.root}>
                        {row}
                    </div>
                </Grid>)
  }
  return <Grid container>
            {tiles}
          </Grid>
}

function NQueen() {
  const [on,setOn] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const len = useAppSelector(state => state.nQueen.length);
  const isOver = useAppSelector(state => state.nQueen.isOver);
  const records = useAppSelector(state => state.nQueen.records);
  const dp = useAppSelector(state => state.nQueen.dp);
  const idx = useAppSelector(state => state.nQueen.idx);
  const position = useAppSelector(state => state.nQueen.position);
  const val = isOver?dp.length === 0?[-1,-1,-1,-1]:[dp[position],-1,-1,-1]:records[idx];
  const chessBoard: number[][] = new Array(len).fill(-1).map(() => 
    new Array(len).fill(-1)
  );
  if (val[0] !== -1){
    let v = val[0];
    for (let i = 0; i < len; i++){
      if (v === 0) break;
      chessBoard[i][v%10 - 1] = 1;
      v=~~(v/10);
    }
  }
  if (val[1] !== -1){
    if (val[3] === 1){
      chessBoard[val[1]][val[2]] = 1;
    }else{
      chessBoard[val[1]][val[2]] = 0;
    }
  }
  useEffect(()=>{
    let interval:ReturnType<typeof setInterval>|null = null;
    if (on && !isOver){
      interval = setInterval(()=>{
        dispatch(nQFoward());
        if (isOver) setOn(false);
      },50);
    }else{
      clearInterval(interval!);
    }
    return () =>clearInterval(interval!);
  },[on,isOver]);

  return (
    <Grid container spacing = {3} justify="center" alignItems="center" justifyContent="center">
        <Grid item xs = {12} >
            <Typography variant="h4">NQueen</Typography>
            <Box pt = {3}>
                <Tiles board = {chessBoard}/>
            </Box>
        </Grid> 
        <Grid container xs = {12} alignItems="center" justifyContent="center">
            <ButtonGroup
                orientation="horizontal"
                aria-label="vertical outlined button group"
                color="primary"
            >
                <Button onClick = {() => dispatch(nQBackward())}>
                    <img src = {backward} alt = "backward"/>
                </Button>
                <Button onClick = {() => setOn(!on)} disabled = {isOver}>{
                    on&&!isOver?<img src = {pause} alt = "pause"/>:<img src = {play} alt = "play"/>
                }</Button>
                <Button onClick = {() => dispatch(nQFoward())}>
                    <img src = {fastForward} alt = "fastForward"/>
                </Button>
            </ButtonGroup>
          
        </Grid>
        <Grid container xs = {12} alignItems="center" justifyContent="center">
            <Button onClick = {() => {
                dispatch(nQResize(0));
                setOn(false);
                dispatch(nQReset());
            }} variant = "outlined" color="primary" disabled = {len === 4}>decrease</Button>
            <Button onClick = {() => {
                setOn(false);
                dispatch(nQReset());
            }} variant = "contained" color="primary">refresh</Button>
            <Button onClick = {() => {
                dispatch(nQResize(1));
                setOn(false);
                dispatch(nQReset());
            }} variant = "outlined" color="primary" disabled = {len === 8}>increase</Button>
        </Grid>
        
    </Grid>
  );
}

export default NQueen;