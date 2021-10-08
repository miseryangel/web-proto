import React,{ useState, useEffect } from 'react';
import { Box, Button, Grid, ButtonGroup, TextField, Typography, FormControl, Select, MenuItem, Slider } from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { useHistory } from 'react-router-dom';
import { arrayStyles } from '../styles/arrayStyle';
import {
  heapReset,
  heapAdd,
  heapRemove,
  heapResize,
} from '../../slices/Heap';
import {
  arrayTransform,
  linkedListTransform,
  queueTransform,
} from '../../slices/Array';
import { HTree } from '../bits/Heaptree';
import { List } from '../bits/List';

function ConditionalHeapRenderer(props:{arr:number[]}){
  if (props.arr.length === 0){
    return <Typography variant="h6" color = "secondary">Heap is Empty!</Typography>
  }else{
    return <HTree arr = {props.arr}/>
  }
} 

function Heap(){
    const dispatch = useAppDispatch();
    const heap = useAppSelector(state => state.heap.heap);
    const hLen = useAppSelector(state => state.heap.len);
    const arr = heap.arr.slice(0,hLen);
    const [val,setVal] = useState(0);
    const [len,setLen] = useState(hLen);
    const [msg,setMsg] = useState<String>("");
    const [sorted,setSorted] = useState<number[]>([]);
    const [visible,setVisible] = useState(false);
    const [order,setOrder] = useState(0);
    const [trans,setTrans] = useState("");
    const [on,setOn] = useState(false);
    const [speed,setSpeed] = useState(200);
    const history = useHistory();
    const classes = arrayStyles();

    useEffect(() =>{
      let interval:ReturnType<typeof setInterval>|null = null;
      if (on && hLen > 0){
        interval = setInterval(()=>{
          removeHandler();
        },speed);
      }else{
        setOn(false);
        clearInterval(interval!);
      }
      return () =>clearInterval(interval!);
    },[visible,hLen,arr,sorted,on])

    const msgHandler = (message:String) =>{
      setVisible(true);
      setMsg(message);
      let interval = setInterval(() => setVisible(false),2000);
      return () =>clearInterval(interval);
    }

    const orderHandler = (e:React.ChangeEvent<{value:unknown}>) =>{
      e.target.value === 1? setOrder(1):setOrder(0);
    }

    const transHandler = (e:React.ChangeEvent<{value:unknown}>) =>{
      const choice = e.target.value as string;
      setTrans(choice);
    }
    const removeHandler = () => {
      const tmp = [...sorted];
      if (tmp.length >= 20){
        tmp.shift();
      }
      tmp.push(arr[0]);
      setSorted(tmp);
      dispatch(heapRemove());
    }

    const maximize = () =>{
      switch(trans){
        case "LinkedList":
          dispatch(linkedListTransform(arr));
          break;
        case "Queue":
          dispatch(queueTransform(arr));
          break;
        case "Array":
          dispatch(arrayTransform(arr));
          break;
      }
      history.push(`/${trans}`);
    }
    
    return (
        <Box pt={5}>
            <Grid container spacing = {3} justify="center">
                <Grid item xs = {10} justify="center"> 
                    <Typography variant="h4">Heap</Typography>
                    <ConditionalHeapRenderer arr = {arr} />
                    <List arr = {sorted} active = {sorted.length-1}/>
                </Grid>
                <Grid item xs = {10} >
                  <Button variant = "contained" className={classes.transform} onClick= {maximize}>Transform</Button>
                  <Select
                      labelId="trans-label"
                      className="trans-select"
                      value={trans}
                      label="Transformation"
                      autoWidth 
                      type="text"
                      onChange = {transHandler}
                    >
                      <MenuItem value={"LinkedList"}>linkedList</MenuItem>
                      <MenuItem value={"Queue"}>queue</MenuItem>
                      <MenuItem value={"Stack"}>stack</MenuItem>
                      <MenuItem value={"BST"}>BinarySearchTree</MenuItem>
                      <MenuItem value={"AVLTree"}>AVLTree</MenuItem>
                      <MenuItem value={"Heap"}>Heap</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs = {10}>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        color="primary"
                    >
                      <TextField
                            className="outlined-number"
                            label="Number"
                            type="number"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            InputProps={{
                            inputProps: { 
                                max: 100, min: 0 
                            }
                            }}
                            defaultValue = {val}
                            variant="outlined"
                            size="small"
                            onChange = {(e) => setVal(+e.target.value)}
                            style={{marginBottom:"10px"}}
                      />
                      <TextField
                        className="outlined-number"
                        label="Length"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: { 
                              max: 20, min: 0 
                          }
                        }}
                        defaultValue = {len}
                        variant="outlined"
                        size="small"
                        onChange={(e)=>{
                          const newLen = +e.target.value;
                          if (newLen >= 0  && newLen <= 20){
                            setLen(newLen);
                            dispatch(heapResize(newLen));
                            dispatch(heapReset(order))
                          }
                        }}
                      />
                    </ButtonGroup>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        color="primary"
                    >
                      <Button variant = "contained" onClick= {() => {
                        sorted.splice(0,sorted.length);
                        dispatch(heapReset(order));
                      }}>Refresh</Button>
                      <Button onClick = {() => dispatch(heapAdd(val))} >Add</Button>
                      <Button onClick = {removeHandler} disabled={arr.length === 0}>Remove</Button>
                    </ButtonGroup>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        color="primary"
                    >
                      <Button onClick = {() => setOn(true)} disabled={arr.length === 0}>HeapSort</Button>
                      <Slider
                        aria-label="Speed"
                        defaultValue={200}
                        valueLabelDisplay="auto"
                        step={2}
                        min={100}
                        max={300}
                        onChange={ (e, val) => {
                          const spd = val as number;
                          setSpeed(spd);
                        }}
                      />
                    </ButtonGroup>
                </Grid>
                {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
            </Grid>
        </Box>   
    );
}

export default Heap;