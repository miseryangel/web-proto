import React, { useEffect } from 'react';
import { Typography, Grid, Link, Paper } from '@material-ui/core';
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
          <Link href="/Array">
            <Typography variant="h6">Array</Typography>
          </Link>
          <Link href="/Stack" >
            <Typography variant="h6">Stack</Typography>
          </Link>
          <Link href="/Queue" >
            <Typography variant="h6">Queue</Typography>
          </Link>
          <Link href="/LinkedList" >
            <Typography variant="h6">LinkedList</Typography>
          </Link>
          <Link href="/BST" >
            <Typography variant="h6">BinarySearchTree</Typography>
          </Link>
          <Link href="/RedBlackTree" >
            <Typography variant="h6">RedBlackTree</Typography>
          </Link>
          <Link href="/AVLTree" >
            <Typography variant="h6">AVLTree</Typography>
          </Link>
          <Link href="/Heap" >
            <Typography variant="h6">Heap</Typography>
          </Link>
        </Paper>
      </Grid>
      <Grid item xs = {6}>
        <Paper className={classes.root} >
          <Link href="/Sorting/BubbleSort" >
            <Typography variant="h6">BubbleSort</Typography>
          </Link>
          <Link href="/Sorting/MergeSort" >
            <Typography variant="h6">MergeSort</Typography>
          </Link>
          <Link href="/Sorting/QuickSort" >
            <Typography variant="h6">QuickSort</Typography>
          </Link>
          <Link href="/Sorting/RadixSort" >
            <Typography variant="h6">RadixSort</Typography>
          </Link>
          <Link href="/Backtracking" >
            <Typography variant="h6">Backtracking</Typography>
          </Link>
          <Link href="/NQueen" >
            <Typography variant="h6">NQueen</Typography>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default HomePage;