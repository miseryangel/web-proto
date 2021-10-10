import React, { useEffect }  from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import HomePage from './HomePage';
import Array from './array/Array';
import BST from './trees/BST';
import './Main.css';
import Queue from './array/Queue';
import Stack from './array/Stack';
import LinkedList from './array/LinkedList';
import AVL from './trees/AVL';
import BubbleSort from './sorting/bubbleSort';
import MergeSort from './sorting/mergeSort';
import Heap from './trees/Heap';
import Backtracking from './pathfinding/Backtracking';
import QuickSort from './sorting/quickSort';
import RadixSort from './sorting/radixSort';
import RedBlack from './trees/RedBlack';



function Main (){
  
  useEffect(()=>{
    console.log("Main page is loaded");
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{padding:"0"}} >
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh"}}
        >
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/Array" 
                component={() => 
                  <Array
                  />
                } 
            />
            <Route path="/Queue" 
                component={() => 
                  <Queue
                  />
                } 
            />
            <Route path="/Stack" 
                component={() => 
                  <Stack
                  />
                } 
            />
            <Route path="/LinkedList" 
                component={() => 
                  <LinkedList
                  />
                } 
            />
            <Route path="/BST" 
                component={() => 
                  <BST
                  />
                } 
            />
            <Route path="/AVLTree" 
                component={() => 
                  <AVL
                  />
                } 
            />
            <Route path="/RedBlackTree" 
                component={() => 
                  <RedBlack
                  />
                } 
            />
            <Route path="/Sorting/BubbleSort" 
                component={() => 
                  <BubbleSort
                  />
                } 
            />
            <Route path="/Sorting/MergeSort" 
                component={() => 
                  <MergeSort
                  />
                } 
            />
            <Route path="/Sorting/QuickSort" 
                component={() => 
                  <QuickSort
                  />
                } 
            />
            <Route path="/Sorting/RadixSort" 
                component={() => 
                  <RadixSort
                  />
                } 
            />
            <Route path="/Heap" 
                component={() => 
                  <Heap
                  />
                } 
            />
            <Route path="/Backtracking" 
                component={() => 
                  <Backtracking
                  />
                } 
            />
            <Redirect to="/home"/>
          </Switch>
        </Typography>
      </Container>
    </React.Fragment>
  );

}

export default withRouter(Main);