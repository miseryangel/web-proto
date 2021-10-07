import {useEffect} from 'react';
import { Container, Row,Col,Button } from 'reactstrap';

function Tile(props:{
    coord: {
        r:number,
        c:number
    };
    val: string;
    height: string;
    width: string;
    name: string;
    onChange: (coord:{r:number;c:number}) => void;
}){
    let currentId = `${props.coord.r} + ${props.coord.c}`;
    const mouseHandler = () =>{
        if (props.val === '0'){
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
    
    return <Col className = {props.name} id = {currentId} height = {props.height} width = {props.width}>{props.val}</Col>
}
export default Tile;