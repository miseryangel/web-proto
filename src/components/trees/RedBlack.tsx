import {  RedBlackNode } from "../../slices/bricks/node";
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RBTree } from '../bits/RedBlackTree';
import { useState, useEffect } from 'react';
import {
    redBlackAddNode,
    redBlackDeleteNode,
} from '../../slices/Tree';
import { traverseHelper } from '../bits/TraverseHelper';

function ConditionalTreeRenderer(props:{root:RedBlackNode | null, active:number}){
    if (props.root === null){
      return (
        <Box pt = {5} pb={2} >
            <Typography variant="h6" color = "secondary">Red Black Tree is Empty!</Typography>
        </Box>
        )
    }else{
      return <RBTree root = {props.root} active = {props.active}/>
    }
  }  


const RedBlack = () =>{
    const dispatch = useAppDispatch();
    const tree = useAppSelector(state => state.redBlack.tree);
    const root = tree.root;
    const visited = useAppSelector(state => state.redBlack.visited);
    const [val,setVal] = useState(-1);
    const [nodeVal,setNodeVal] = useState(-1);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const [traverseChoice,setTraverseChoice] = useState(1);
    const [idx,setIdx] = useState(0);
    const [on,setOn] = useState(false);
    const [traverse,setTraverse] = useState<number[]>([]);
    useEffect(() =>{
        let interval:ReturnType<typeof setInterval>|null = null;
        if (on && idx < traverse.length){
            console.log(idx);
            interval = setInterval(() =>{
                setIdx(idx+1);
            },200);
        }else{
            setOn(false);
            clearInterval(interval!);
        }
        return () =>clearInterval(interval!);
    },[visible,on,traverse,idx])

    const msgHandler = (message:String) =>{
        setVisible(true);
        setMsg(message);
        let interval = setInterval(() => setVisible(false),2000);
        return () =>clearInterval(interval);
    }

    const traverseHandler = () =>{
        const tmp:number[] = [];
        traverseHelper(root,tmp,traverseChoice);
        setTraverse(tmp);
        setIdx(0);
        setOn(true);
        console.log(on);
    }
    const dfs = (node: RedBlackNode|null, value:number):number =>{
        if (node === null) return 0;
        if (value > node.val){
            return dfs(node.right,value);
        }
        return dfs(node.left,value);
    }

    return (
        <Box pt={5}>
            <Grid container spacing = {3} justify="center">
                <Grid item xs = {8} justify="center"> 
                    <Typography variant="h4">Red Black Tree</Typography>
                    <ConditionalTreeRenderer root = {root} active = {idx >= traverse.length?-1e4:traverse[idx]} />
                </Grid>
                <Grid item xs = {3}>
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
                            label="Node"
                            type="number"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            InputProps={{
                            inputProps: { 
                                max: 100, min: 0 
                            }
                            }}
                            defaultValue = {nodeVal}
                            variant="outlined"
                            size="small"
                            onChange = {(e) => setNodeVal(+e.target.value)}
                            style={{marginBottom:"10px"}}
                        />
                        <FormControl variant="outlined" size="small">
                            <Select
                            labelId="order-label"
                            className="order-select"
                            value={traverseChoice}
                            label="Order"
                            autoWidth 
                            type="number"
                            onChange = {(e) =>{
                              const op = e.target.value as number;
                              setTraverseChoice(op);
                            }}
                            >
                            <MenuItem value={1}>inOrder</MenuItem>
                            <MenuItem value={2}>preOrder</MenuItem>
                            <MenuItem value={3}>postOrder</MenuItem>
                            </Select>
                        </FormControl>
                        
                    </ButtonGroup>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        color="primary"
                    >
                        <Button onClick= {() =>{
                            if (visited.has(val)){
                                msgHandler("RedBlackNode already exists!");
                            }else{
                                const depth = dfs(root,val);
                                if (depth > 5){
                                    msgHandler("Tree has reached the height limit !");
                                    return;
                                }
                                dispatch(redBlackAddNode(val));
                            }
                        }} >insert</Button>
                        <Button onClick= {() =>{
                            if (!visited.has(val)){
                                msgHandler("Node doesn't exist!");
                            }else{
                                dispatch(redBlackDeleteNode(val));
                            }
                        }} >remove</Button>
                        <Button onClick= {traverseHandler} >traverse</Button>
                    </ButtonGroup>
                </Grid>
                {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
            </Grid>
        </Box>

    )
}

export default RedBlack;