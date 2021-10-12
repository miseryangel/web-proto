import React from 'react';
import { Paper, Grid, Box } from '@material-ui/core';
import { linkedListStyles } from '../styles/linkedListStyle';
import link from '../../assets/arrowForLinkedList.svg';

export const LList = (props:{arr:number[],active:number}) =>{
    const classes = linkedListStyles();
    const arr = props.arr.map((val,index)=>{
        return (
                <div className = {classes.root}>
                    <Paper variant="outlined" 
                        className = {
                            index === props.active?classes.active:classes.node
                        } elevation={3}>
                        {val}
                    </Paper>
                    {index !== props.arr.length - 1 && <img src = {link} alt = "link"/>}
                </div>
                )
                
    });
    return (
        <Box pt = {5} pb={2} width = "94.6%" >
            <Grid container >
                {arr}
            </Grid>
        </Box>
        
    );
}