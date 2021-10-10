import * as THREE from 'three';
import React, { useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

// https://stackoverflow.com/questions/68061538/difficulty-creating-basic-line-react-three-fiber-and-typescript

const Line = (props:{width:number,height:number,choice:number}) =>{
    return (
        <svg viewBox="50 50 50 50">
  <ellipse cx="50" cy="50" rx="50" ry="50"></ellipse>
</svg>
    );
}

export default Line;