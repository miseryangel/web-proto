import {useEffect} from 'react';
import { Paper } from '@material-ui/core';
import { pathFindingStyles } from '../styles/pathFindingStyle';

function Tile(props:{
    coord: {
        r:number,
        c:number
    };
    val: number;
    onChange: (coord:{r:number;c:number}) => void;
}){
    const classes = pathFindingStyles();
    let currentId = `${props.coord.r} + ${props.coord.c}`;
    let val = "";

    const mouseHandler = () =>{
        if (val === '0'){
            props.onChange(props.coord);
        }else{
            props.onChange(props.coord);
        }
    }
    
    useEffect(() =>{
        let currentElement = document.getElementById(currentId);
        currentElement!.addEventListener('mousedown', mouseHandler);
        return () =>{
            currentElement!.removeEventListener('mousedown', mouseHandler);
        };
    },[])
    switch(props.val){
        case -1:
            return <Paper className = {classes.blank} id = {currentId} >{val}</Paper>
        case 0:
            return <Paper className = {classes.start} id = {currentId} >{val}</Paper>
        case 1:
            return <Paper className = {classes.end} id = {currentId} >{val}</Paper>
        case 2:
            return <Paper className = {classes.obstacle} id = {currentId} >{val}</Paper>
        case 3:
          return <Paper className = {classes.visited} id = {currentId} >{val}</Paper>
        default:
          return <Paper className = {classes.path} id = {currentId} >{val}</Paper>
    }
}
export default Tile;