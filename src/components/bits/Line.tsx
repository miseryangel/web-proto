import * as THREE from 'three';
import React, { useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

// https://stackoverflow.com/questions/68061538/difficulty-creating-basic-line-react-three-fiber-and-typescript

const Line = (props:{width:number,height:number,choice:number}) =>{
    return (
        <svg width={`${props.width}px`} height={`${props.height}px`} viewBox={`0 0 ${props.width} ${props.height}`}
        xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="50" y2="20" stroke-width={5} stroke='black'/>
        </svg>
    );
}

export default Line;