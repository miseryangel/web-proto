import { RedBlackNode } from "../../slices/bricks/node";
import { RED } from '../../slices/bricks/symbol';
import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Box, Card } from '@material-ui/core';
import { redBlackStyles } from '../styles/redBlackStyle';
import * as d3 from 'd3';
import {Line} from './check';
import { linedraw } from "./linedraw";

const DFS = (props:{node:RedBlackNode|null,active:number,posHandler:(coord:{x:number;y:number}) => void})=>{
    const classes =redBlackStyles();
    const nodeRef = useRef();
    const leftRef = useRef();
    const rightRef = useRef();
    const [cc,setCC] = useState({x:-1,y:-1});
    const [lc,setLeftCoord] = useState({x:-1,y:-1});
    const [rc,setRightCoord] = useState({x:-1,y:-1});
    const [rendered,setRendered] = useState(false);
    const [left,setLeft] = useState(false);
    const [right,setRight] = useState(false);
    const leftHandler = (coord:{x:number;y:number}) =>{
        setLeftCoord(coord);
    }
    const rightHandler = (coord:{x:number;y:number}) =>{
        setRightCoord(coord);
    }

    useEffect(()=>{
        const cur = nodeRef.current as any;
        const position = cur.getBoundingClientRect();
        console.log("val is ", props.node);
        console.log(" position is",position);
        setCC({x:position.x,y:position.y});
        setRendered(true);
        if (props.node === null){
            props.posHandler({x:-1,y:-1});
            setRendered(false);
        }else{
            props.posHandler({x:position.x,y:position.y});
            if (props.node.left !== null){
                setLeft(true);
            }else{
                setLeft(false);
            }
            if (props.node.right !== null){
                setRight(true);
            }else{
                setRight(false);
            }
        }
    },[rendered,props.node,left,right]);

    useEffect(() =>{
        const cur = nodeRef.current as any;
        const position = cur.getBoundingClientRect();
        const svg = d3.select(cur);
        if (lc.x !== -1){
            // console.log(position);
            // console.log("this is lc",lc);
            // const leftline = svg.append('svg')
            //              .append('line')
            //             .style("stroke","light-blue")
            //             .style("stroke-width",10)
            //             .attr("x1",position.x)
            //             .attr("y1",position.y)
            //             .attr("x2",lc.x)
            //             .attr("y2",lc.y);
        }
        if (rc.x !== -1){
            // console.log(position);
            // console.log("this is rc",rc);
            // const rightline = svg.append('svg')
            //              .append('line')
            //             .style("stroke","light-blue")
            //             .style("stroke-width",10)
            //             .attr("x1",position.x)
            //             .attr("y1",position.y)
            //             .attr("x2",rc.x)
            //             .attr("y2",rc.y);
        }
    } ,[rendered,left,right]);

    if (props.node === null) return <Card ref = {nodeRef}></Card>;
    let redblack;
    if (props.node.color === RED){
        redblack = props.active === props.node.val?classes.redActive:classes.red;
    }else{
        redblack = props.active === props.node.val?classes.blackActive:classes.black;
    }

    return (
        <Grid container justify="center">
            <div className = {classes.root}>
                {left && <Line ax = {lc.x} ay = {lc.y+16} bx = {cc.x} by = {cc.y+16} dir = {0} />}
                <Paper ref = {nodeRef}  className = {redblack}>{props.node.val}</Paper>
                {right && <Line ax = {cc.x} ay = {cc.y+16} bx = {rc.x} by = {rc.y+16} dir = {1} />}
            </div>
            <Grid container justify="center">
                <Grid item xs = {6}>
                    <DFS node = {props.node.left} active = {props.active} posHandler =  {leftHandler}/>
                </Grid>
                <Grid item xs = {6}>
                    <DFS node = {props.node.right} active = {props.active} posHandler =  {rightHandler} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export const RBTree = (props:{root:RedBlackNode,active:number,arr:number[]}) =>{
    const [coord,setCoord] = useState({x:-1,y:-1});
    const posHandler = (coords:{x:number,y:number}) =>{
        setCoord(coords);
    }
    useEffect(() =>{
        console.log("maybe it doesn't work",coord);
    },[props.arr]);
    return (
        <Box pt = {5} pb={2} width = "94.6%">
            <DFS node = {props.root} active = {props.active} posHandler = {posHandler} />
        </Box>
    );
}