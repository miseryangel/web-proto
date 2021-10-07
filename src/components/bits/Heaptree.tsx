import { Grid, Paper, Box, Card } from '@material-ui/core';
import { arrayStyles } from '../styles/arrayStyle';

export const HTree = (props:{arr:number[]}) =>{
    const classes =arrayStyles();
    const dfs = (arr:number[],idx:number)=>{
        if (idx >= arr.length) return <Card></Card>;
        const left = dfs(arr,idx*2+1), right = dfs(arr,idx*2+2);
        return (
            <Grid container justify="center">
                <Paper className = {classes.node}>{arr[idx]}</Paper>
                <Grid container justify="center">
                    <Grid item xs = {6}>{left}</Grid>
                    <Grid item xs = {6}>{right}</Grid>
                </Grid>
            </Grid>
        )
    }
    return (
        <Box pt = {5} pb={2} width = "94.6%">
            {dfs(props.arr,0)}
        </Box>
    );
}