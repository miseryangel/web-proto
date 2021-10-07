import React,{useState, useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { 
  addObs, 
  chooseStartPoint, 
  chooseEndPoint, 
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
    const [val,setVal] = useState<number>(0);
    const [len,setLen] = useState<number>(boardLen);
    const stateHandler = (v:number) =>{
      setVal(v);
    }
    // need to add dir to path
    useEffect(()=>{
      let interval:ReturnType<typeof setInterval>|null = null;
  
      if (isBegun){
        if (!isOver){
          if (on){
            interval = setInterval(()=>{
              dispatch(obsforward());
            },50);
          }else{
            clearInterval(interval!);
          }
        }
      }
      return () =>clearInterval(interval!);
    },[on]);
  
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
    }
    
    const sizeHandler = (val:number) =>{
      val === 1?dispatch(reScale(1)):dispatch(reScale(0));
      resetHandler();
    }
  
  
    return (
      <div >          
          <PathFindingPlayGround board = {board} choice = {val}/>
          <Button onClick= {() =>sizeHandler(1)} disabled = {boardLen === 12}>increase</Button>
          <Button onClick= {() =>sizeHandler(0)} disabled = {boardLen === 2}>decrease</Button>
          <Button onClick = {resetHandler} >reset</Button>
          <Button onClick = {() => stateHandler(1)} disabled = {isBegun}>chooseStartPoint</Button>
          <Button onClick = {() => stateHandler(2)} disabled = {isBegun}>chooseEndPoint</Button>
          <Button onClick = {() => stateHandler(3)}>addObstacles</Button>
          <Button onClick = {playHandler} >begin</Button>
      </div>
    );
  }
  
  export default Backtracking;