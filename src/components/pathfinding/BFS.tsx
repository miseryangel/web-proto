import React,{useState, useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { 
  bfsResize,
  bfsReset,
  bfsBegin,
  bfsForward,
} from '../../slices/PathFinding';
import { PFPlayGround } from '../bits/PFPlayGround';

function BFS() {
    const dispatch = useAppDispatch();
    const board = useAppSelector(state => state.bfs.board);
    const height = useAppSelector(state => state.bfs.height);
    const width = useAppSelector(state => state.bfs.width);
    const isBegun = useAppSelector(state => state.bfs.hasBegun);
    const isOver = useAppSelector(state => state.bfs.isOver);
    const [wd,setWd] = useState(width);
    const [ht,setHt] = useState(height);
    const [on,setOn] = useState<boolean>(false);
    const [val,setVal] = useState<number>(0);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const stateHandler = (v:number) =>{
      setVal(v);
    }
    // need to add dir to path
    useEffect(()=>{
      let interval:ReturnType<typeof setInterval>|null = null;
      if (isBegun && on && !isOver){
        interval = setInterval(()=>{
          dispatch(bfsForward());
        },50);
        if (isOver){
          setOn(true);
        }
      }else{
        clearInterval(interval!);
      }
      return () =>clearInterval(interval!);
    },[on,isOver]);
  
    const playHandler = () =>{
      if (!isBegun){
        dispatch(bfsBegin());
        setOn(!on);
      }else{
        setOn(!on);
      }
    }
    const resetHandler = () =>{
      dispatch(bfsReset());
      setVal(0);
      setOn(false);
    }
    const msgHandler = (message:String) =>{
      setVisible(true);
      setMsg(message);
      setInterval(() => setVisible(false),2000);
    }
    
    return (
      <Grid container spacing = {3} justify="center" alignItems="center" justifyContent="center"> 
        <Grid item xs = {8} >
          <Typography variant="h4">Breadth First Search</Typography>
          <PFPlayGround board = {board} choice = {val}/>
        </Grid>  
        <Grid item xs = {4} alignItems="center">
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button variant = "contained" onClick = {resetHandler} >refresh</Button>
            <Button onClick = {() => stateHandler(0)} disabled = {isBegun}>chooseStartPoint</Button>
            <Button onClick = {() => stateHandler(1)} disabled = {isBegun}>chooseEndPoint</Button>
            <Button onClick = {() => stateHandler(2)} disabled = {isOver}>addObstacles</Button>
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="secondary"
          >
            <div className = "label-container">
              <TextField
                className="outlined-number"
                label="height"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                      max: 10, min: 5 
                  }
                }}
                defaultValue = {ht}
                variant="outlined"
                size="small"
                onChange = {(e) => setHt(+e.target.value)}
              />
            </div>
            <Button variant = "contained" onClick = {() =>{
              if (wd >= 8 && wd <= 15 && ht >= 5 && ht <= 10){
                dispatch(bfsResize({height:ht,width:wd}));
                dispatch(bfsReset());
                setOn(false);
              }else{
                msgHandler("Invalid width or height!");
              }
            }} >
              changeSize
            </Button>
            <Box pt = {0}>
              <div className = "label-container">
                <TextField
                  className="outlined-number"
                  label="width"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: { 
                        max: 15, min: 8 
                    }
                  }}
                  defaultValue = {wd}
                  variant="outlined"
                  size="small"
                  onChange = {(e) => setWd(+e.target.value)}
                />
              </div>
            </Box>
            

          </ButtonGroup>
            
          <Box>
            <Button variant = "contained" color="primary" onClick = {playHandler} >start</Button>
          </Box>
          {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
        </Grid>   
      </Grid>
    );
  }
  
  export default BFS;







            

  