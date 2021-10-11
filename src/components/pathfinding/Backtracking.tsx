import React,{useState, useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { 
  begin, 
  obsforward,
  reScale,
  obsReset 
} from '../../slices/Backtracking';
import { PathFindingPlayGround } from '../bits/PathFindingPlayGround';

function Backtracking() {
    const dispatch = useAppDispatch();
    
    const board = useAppSelector(state => state.backtracking.board);
    const isBegun = useAppSelector(state => state.backtracking.hasBegun);
    const isOver = useAppSelector(state => state.backtracking.isOver);
    const boardLen = useAppSelector(state => state.backtracking.length);
    const [on,setOn] = useState<boolean>(false);
    const [over,setOver] = useState<boolean>(false);
    const [val,setVal] = useState<number>(0);
    const stateHandler = (v:number) =>{
      setVal(v);
    }
    // need to add dir to path
    useEffect(()=>{
      let interval:ReturnType<typeof setInterval>|null = null;
  
      if (isBegun && on && !over){
        interval = setInterval(()=>{
          dispatch(obsforward());
        },50);
        if (isOver){
          setOver(true);
          setOn(true);
        }
      }else{
        clearInterval(interval!);
      }
      return () =>clearInterval(interval!);
    },[on,over,isOver]);
  
    const playHandler = () =>{
      if (!isBegun){
        dispatch(begin());
        setOn(!on);
      }else{
        setOn(!on);
      }
    }
    const resetHandler = () =>{
      dispatch(obsReset());
      setVal(0);
      setOn(false);
      setOver(false);
    }
    
    const sizeHandler = (val:number) =>{
      val === 1?dispatch(reScale(1)):dispatch(reScale(0));
      resetHandler();
    }
  
  
    return (
      <Grid container spacing = {3} justify="center" alignItems="center" justifyContent="center"> 
        <Grid item xs = {8} >
          <Typography variant="h4">Backtracking</Typography>
          <PathFindingPlayGround board = {board} choice = {val}/>
        </Grid>  
        <Grid item xs = {4} alignItems="center">
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button variant = "contained" onClick = {resetHandler} >refresh</Button>
            <Button onClick= {() =>sizeHandler(1)} disabled = {boardLen === 11}>increase</Button>
            <Button onClick= {() =>sizeHandler(0)} disabled = {boardLen === 7}>decrease</Button>
          </ButtonGroup>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="secondary"
          >
            <Button onClick = {() => stateHandler(1)} disabled = {isBegun}>chooseStartPoint</Button>
            <Button onClick = {() => stateHandler(2)} disabled = {isBegun}>chooseEndPoint</Button>
            <Button onClick = {() => stateHandler(3)} disabled = {isOver}>addObstacles</Button>
          </ButtonGroup>
          <Box>
            <Button variant = "contained" color="primary" onClick = {playHandler} >begin</Button>
          </Box>
        </Grid>   
      </Grid>
    );
  }
  
  export default Backtracking;