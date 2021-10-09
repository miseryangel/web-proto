import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, TextField, Slider, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    quickReset,
    quickResize,
    quickForward 
} from '../../slices/Sorting';

function Tiles(props:{arr:number[], pivots:number[]}){
    console.log(props.arr);
    let array = [];
    for (let i = 0; i < props.arr.length; i++){
      if (props.pivots.includes(i)){
        array.push(<div className= "array-bar-active" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
      }else{
        array.push(<div className= "array-bar" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
      }
    }
    return <div className ="array-container">
              {array}
            </div>
  }


function QuickSort() {
    // CHANGE ISoVER TO HOOKS
    const [on,setOn] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isOver = useAppSelector(state => state.quickSort.isOver);
    const array = useAppSelector(state => state.quickSort.arr);
    const [over,setOver] =  useState<boolean>(isOver);
    const pivots = useAppSelector(state => state.quickSort.pivots);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const [speed,setSpeed] = useState(10);

    useEffect(()=>{
        let interval:ReturnType<typeof setInterval>|null = null;
        if (on && !over){
          interval = setInterval(()=>{
              dispatch(quickForward());
              if (isOver){
                setOver(true);
                setOn(false);
              } 
          },speed);
        }else{
        clearInterval(interval!);
        }
        return () =>clearInterval(interval!);
    },[on,over]);

    const msgHandler = (message:String) =>{
        setVisible(true);
        setMsg(message);
        setInterval(() => setVisible(false),2000);
      }

    return (
        <Grid container spacing = {3} justify="center">
            <Grid item xs = {10}>
                <Typography variant="h4">QuickSort</Typography>
                <Tiles arr = {array} pivots={!on||over?[]:pivots}/>
            </Grid>
            <Grid item xs = {10}>
                <Box pt={20} pl={70}>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        color="primary"
                    >
                        <Button variant = "contained" onClick = {() => {
                            setOver(false);
                            dispatch(quickReset());
                        }}>reset</Button>
                        <Button onClick = {() => setOn(!on)} disabled={over}>{on?`pause`:`start`}</Button>
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
                            dispatch(quickResize(newLen));
                            dispatch(quickReset());
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
                    {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}

                    </Box>
                </Grid>
        </Grid>
    );
}
  
export default QuickSort;