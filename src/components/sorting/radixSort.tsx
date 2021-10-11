import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Grid, Button, TextField, Slider, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    radixReset,
    radixResize,
    radixForward 
} from '../../slices/Sorting';
import { radixStyles } from '../styles/radixSortStyle';

function Tiles(props:{arr:number[],index:number}){
    const classes = radixStyles();
    return <Box pt= {2}><Grid container className = {classes.root}>{props.arr.map((ele,index) =>{
        return <Paper variant="outlined" className={index===props.index?classes.active:classes.node} elevation={3}>{ele}</Paper>
    })}</Grid></Box>
}


function RadixSort() {
    // CHANGE ISoVER TO HOOKS
    const [on,setOn] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isOver = useAppSelector(state => state.radixSort.isOver);
    const array = useAppSelector(state => state.radixSort.arr);
    const idx = useAppSelector(state => state.radixSort.idx);
    const wordLen = useAppSelector(state => state.radixSort.wordLength);
    const len = useAppSelector(state => state.radixSort.len);
    const [wlen,setWordLen] = useState(wordLen);
    const [llen,setLen] = useState(len);
    const [over,setOver] =  useState<boolean>(isOver);
    const [index,setIndex] = useState<number>(idx);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const [speed,setSpeed] = useState(300);

    useEffect(()=>{
        let interval:ReturnType<typeof setInterval>|null = null;
        if (on && !over){
          interval = setInterval(()=>{
              dispatch(radixForward());
              setIndex(idx);
              if (isOver){
                setOver(true);
                setOn(false);
              } 
          },speed);
        }else{
        clearInterval(interval!);
        }
        return () =>clearInterval(interval!);
    },[on,over,idx,isOver]);

    const msgHandler = (message:String) =>{
        setVisible(true);
        setMsg(message);
        setInterval(() => setVisible(false),2000);
      }

    return (
        <Grid container spacing = {3} justify="center">
            <Grid item xs = {7}>
                <Typography variant="h4">radixSort</Typography>
                {array.map((arr) =>{
                    return <Tiles arr = {arr} index = {on?idx:-1}/>
                })}
            </Grid>
            <Grid container xs = {4} alignItems="center" justifyContent="center">
                <Box pt={8}>
                    <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                    color="primary"
                    >
                        <Button variant = "contained" onClick = {() =>{
                            setOver(false);
                            dispatch(radixReset());
                        }}>refresh</Button>
                        <Button onClick = {() => {setOn(!on)}} disabled={over}>{on?`pause`:`start`}</Button>
                        <Button onClick = {() =>{
                            console.log("whyyy");
                            if ((wordLen >= 5 && wordLen <= 15) && (len >= 5 && len <= 8)){
                                dispatch(radixResize({wordLen:wlen,len:llen}));
                                dispatch(radixReset());
                            }else if (wordLen >= 5 && wordLen <= 15){
                                msgHandler("Invalid array length!");
                            }else{
                                msgHandler("Invalid integer length!");
                            }
                        }}>resize</Button>
                    </ButtonGroup>
                    <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                    color="primary"
                    >
                        <div className = "label-container">
                            <TextField
                                className="outlined-number"
                                label="wordLength"
                                type="number"
                                InputLabelProps={{
                                shrink: true,
                                }}
                                InputProps={{
                                inputProps: { 
                                    max: 15, min: 5 
                                }
                                }}
                                defaultValue = {10}
                                variant="outlined"
                                size="small"
                                onChange={(e)=>{
                                const newWordLen = +e.target.value;
                                setWordLen(newWordLen);
                                }}
                            />
                        </div>
                        <div className = "label-container">
                            <Box pt = {1}> 
                                <TextField
                                    className="outlined-number"
                                    label="Length"
                                    type="number"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    InputProps={{
                                    inputProps: { 
                                        max: 8, min: 5 
                                    }
                                    }}
                                    defaultValue = {8}
                                    variant="outlined"
                                    size="small"
                                    onChange={(e)=>{
                                    const newLen = +e.target.value;
                                    console.log(newLen);
                                    setLen(newLen);
                                    }}
                                />
                            </Box>
                            
                        </div>
                        

                        <Slider
                        aria-label="Speed"
                        defaultValue={speed}
                        valueLabelDisplay="auto"
                        step={20}
                        min={200}
                        max={1000}
                        onChange={ (e, val) => {
                            const spd = val as number;
                            setSpeed(spd);
                        }}
                        />
                        {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
                    </ButtonGroup>
                </Box>
            </Grid>
        </Grid>
    );
}
  
export default RadixSort;