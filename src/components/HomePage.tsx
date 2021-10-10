import React, { useEffect } from 'react';
import { Grid, Link, Paper } from '@material-ui/core';
import { useStyles } from './styles/homeStyle';


const HomePage = () =>{
  const classes = useStyles();
  useEffect(()=>{
    console.log("whyyyy");
  },[])
  return (
    <Grid container spacing = {3}>
      {/* <Grid item xs = {6}>
        <Paper elevation={3}>xs=6</Paper>
      </Grid>
      <Grid item xs = {6}>
        <Paper elevation={3}>xs=6</Paper>
      </Grid> */}
      <Grid item xs = {6}>
        <Paper className={classes.root} >
          <Link href="/Array">Array</Link>
          <Link href="/Stack" >Stack</Link>
          <Link href="/Queue" >Queue</Link>
          <Link href="/LinkedList" >LinkedList</Link>
          <Link href="/BST" >Binary Search Tree</Link>
          <Link href="/RedBlackTree" >Red Black Tree</Link>
          <Link href="/AVLTree" >AVLTree</Link>
          <Link href="/Sorting/BubbleSort" >BubbleSort</Link>
          <Link href="/Sorting/MergeSort" >MergeSort</Link>
          <Link href="/Sorting/QuickSort" >QuickSort</Link>
          <Link href="/Sorting/RadixSort" >RadixSort</Link>
          <Link href="/Heap" >Heap</Link>
          <Link href="/Backtracking" >Backtracking</Link>
        </Paper>
      </Grid>
      <Grid item xs = {6}>
        <Paper className={classes.root} >
        </Paper>
      </Grid>
    </Grid>
  );
}
export default HomePage;