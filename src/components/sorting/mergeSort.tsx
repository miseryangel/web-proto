import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    mergeReset,
    mergeResize,
    mergeForward 
} from '../../slices/Sorting';

function Tiles(props:{arr:number[], active:number,margin:number[]}){
    console.log(props.arr);
    console.log(props.active);
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
    const [on,setOn] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isOver = useAppSelector(state => state.mergeSort.isOver);
    const array = useAppSelector(state => state.mergeSort.arr);
    const idx = useAppSelector(state => state.mergeSort.idx);
    const round = useAppSelector(state => state.mergeSort.round);
    const margin = useAppSelector(state =>state.mergeSort.stack[round]);
    const [index,setIndex] = useState(idx);
    const [over,setOver] = useState<boolean>(isOver);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        let interval:ReturnType<typeof setInterval>|null = null;
        if (on && !isOver){
        interval = setInterval(()=>{
            dispatch(mergeForward());
            setIndex(idx);
            if (isOver) setOver(true);
        },10);
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
                <Typography variant="h4">mergeSort</Typography>
                <Tiles arr = {array} active={index} margin = {margin}/>
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
                    dispatch(mergeReset());
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