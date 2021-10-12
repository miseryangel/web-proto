import {useEffect} from 'react';
import { Paper } from '@material-ui/core';
import forward from '../../assets/arrow_forward_ios_black_24dp.svg';
import backward from '../../assets/arrow_back_ios_black_24dp.svg';
import north from '../../assets/north_black_24dp.svg';
import south from '../../assets/south_black_24dp.svg';
import { pathFindingStyles } from '../styles/pathFindingStyle';

function Tile(props:{
    coord: {
        r:number,
        c:number
    };
    val: number;
    dir:number;
    onChange: (coord:{r:number;c:number}) => void;
}){
    const classes = pathFindingStyles();
    let currentId = `${props.coord.r} + ${props.coord.c}`;
    let val = "";
    // intend for different behavior unimplemented
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
            return <Paper className = {classes.blank} id = {currentId} ></Paper>
        case 0:
            return <Paper className = {classes.start} id = {currentId} ></Paper>
        case 1:
            return <Paper className = {classes.end} id = {currentId} ></Paper>
        case 2:
            return <Paper className = {classes.obstacle} id = {currentId} ></Paper>
        case 3:
          return <Paper className = {classes.visited} id = {currentId} ></Paper>
        default:
            switch(props.dir){
                case 1:
                    return <Paper className = {classes.path} id = {currentId} >
                                <img src = {forward} alt = "forward"/>
                            </Paper>
                case 2:
                    return <Paper className = {classes.path} id = {currentId} >
                                <img src = {south} alt = "south"/>
                           </Paper>
                case 3:
                    return <Paper className = {classes.path} id = {currentId} >
                                <img src = {backward} alt = "backward"/>
                           </Paper>
                case 4:
                    return <Paper className = {classes.path} id = {currentId} >
                                <img src = {north} alt = "north"/>
                           </Paper>
                default:
                    return <Paper className = {classes.path} id = {currentId} ></Paper>
            }
    }
}
export default Tile;