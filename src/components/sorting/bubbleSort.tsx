import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, TextField, Slider, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    bubbleReset,
    bubbleResize,
    bubbleForward 
} from '../../slices/Sorting';

function Tiles(props:{arr:number[], active:number}){
    console.log(props.arr);
    console.log(props.active);
    let array = [];
    for (let i = 0; i < props.arr.length; i++){
      if (i === props.active){
        array.push(<div className= "array-bar-active" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
      }else{
        array.push(<div className= "array-bar" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
      }
    }
    return <div className ="array-container">
              {array}
            </div>
  }


function BubbleSort() {
    // CHANGE ISoVER TO HOOKS
    const [on,setOn] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isOver = useAppSelector(state => state.bubbleSort.isOver);
    const array = useAppSelector(state => state.bubbleSort.arr);
    const [over,setOver] =  useState<boolean>(isOver);
    const idx = useAppSelector(state => state.bubbleSort.idx);
    const [index,setIndex] = useState<number>(idx);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const [speed,setSpeed] = useState(10);

    useEffect(()=>{
        let interval:ReturnType<typeof setInterval>|null = null;
        if (on && !over){
          interval = setInterval(()=>{
              dispatch(bubbleForward());
              setIndex(idx);
              if (isOver) setOver(true);
          },speed);
        }else{
        clearInterval(interval!);
        }
        return () =>clearInterval(interval!);
    },[on,over,idx]);

    const msgHandler = (message:String) =>{
        setVisible(true);
        setMsg(message);
        setInterval(() => setVisible(false),2000);
      }

    return (
        <Grid container spacing = {3} justify="center">
            <Grid item xs = {10}>
                <Typography variant="h4">BubbleSort</Typography>
                <Tiles arr = {array} active={index+1}/>
            </Grid>
            <Grid item xs = {10}>
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined button group"
              color="primary"
            >
                <Button onClick = {() => setOn(!on)}>{on?`pause`:`start`}</Button>
                <TextField
                className="outlined-number"
                label="Length"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                      max: 200, min: 50 
                  }
                }}
                defaultValue = {100}
                variant="outlined"
                size="small"
                onChange={(e)=>{
                  const newLen = +e.target.value;
                  setOn(false);
                  if (newLen >= 50  && newLen <= 200){
                    dispatch(bubbleResize(newLen));
                    dispatch(bubbleReset());
                  }else if (newLen < 0){
                    msgHandler("invalid length !");
                  }else{
                    msgHandler("value out of range !");
                  }
                }}
                />
                <Slider
                  aria-label="Speed"
                  defaultValue={speed}
                  valueLabelDisplay="auto"
                  step={1}
                  min={5}
                  max={30}
                  onChange={ (e, val) => {
                    const spd = val as number;
                    setSpeed(spd);
                  }}
                />
              </ButtonGroup>
            </Grid>
            {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
        </Grid>
    );
}
  
export default BubbleSort;