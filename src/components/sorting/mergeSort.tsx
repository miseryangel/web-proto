import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    mergeReset,
    mergeResize,
    mergeForward,
    mergeUpdate,
} from '../../slices/Sorting';
import { randomArray } from '../../slices/bricks/arrayGenerator';
import { stackGenerator,subSort } from '../../slices/bricks/mergeHelper';

function Tiles(props:{arr:number[], active:number,margin:number[]}){
    console.log(props.active);
    console.log("now in tiles the array is",props.arr);
    let array = [];
    for (let i = 0; i < props.arr.length; i++){
        if (props.active === i){
          array.push(<div className= "array-bar-active" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
        }else if (i>= props.margin[0] && i<= props.margin[1]){
          array.push(<div className= "array-bar-merge" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
        }else{
          array.push(<div className= "array-bar" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
        }
    }
    return <div className ="array-container">
              {array}
            </div>
  }


function MergeSort() {
    const dispatch = useAppDispatch();
    const [on,setOn] = useState<boolean>(false);
    const isOver = useAppSelector(state => state.mergeSort.isOver);
    const array = useAppSelector(state => state.mergeSort.arr);
    const tmp = useAppSelector(state => state.mergeSort.tmp);
    const idx = useAppSelector(state => state.mergeSort.idx);
    const round = useAppSelector(state => state.mergeSort.round);
    const [margin,setMargin] = useState<number[]>([-1,-1]);
    const stack = useAppSelector(state =>state.mergeSort.stack);
    const [index,setIndex] = useState(idx);
    const [over,setOver] = useState<boolean>(isOver);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        let interval:ReturnType<typeof setInterval>|null = null;
        if (on && !over){
        interval = setInterval(()=>{
            setIndex(idx);
            if (round >= 0){
              setMargin(stack[round]);
              if (idx === stack[round][0]){
                dispatch(mergeUpdate([...subSort(tmp,stack[round][0],stack[round][1])]));
              }
              dispatch(mergeForward());
              if (isOver) setOver(true);
            } 
            if (isOver) setOver(true);
        },10);
        }else{
        clearInterval(interval!);
        }
        return () =>clearInterval(interval!);
    },[on,over,idx,margin]);

    const msgHandler = (message:String) =>{
        setVisible(true);
        setMsg(message);
        setInterval(() => setVisible(false),2000);
      }

    return (
        <Grid container spacing = {3} justify="center">
            <Grid item xs = {10}>
                <Typography variant="h4">mergeSort</Typography>
                <Tiles arr = {array} active={on?index:-1} margin = {margin}/>
                <Tiles arr = {tmp} active={on&&!isOver?index:-1} margin = {margin}/>
            </Grid>
            <Grid item xs = {10}>
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
                  if (newLen >= 50  && newLen <= 200){
                    dispatch(mergeResize(newLen));
                    dispatch(mergeReset({arr:randomArray(newLen),stack:stackGenerator(newLen)}));
                  }else if (newLen < 0){
                    msgHandler("invalid length !");
                  }else{
                    msgHandler("value out of range !");
                  }
                }}
              />
            </Grid>
            {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
        </Grid>
    );
}
  
export default MergeSort;