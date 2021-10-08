import { Nodewise } from "../../slices/bricks/node";
import { Grid, Paper, Box, Card } from '@material-ui/core';
import { arrayStyles } from '../styles/arrayStyle';

export const Tree = (props:{root:Nodewise,active:number}) =>{
    const classes =arrayStyles();
    console.log(props.active);
    const dfs = (node:Nodewise|null)=>{
        if (node === null) return <Card></Card>;
        const left = dfs(node.left), right = dfs(node.right);
        if (node.val === props.active){
            return (
                <Grid container justify="center">
                    <Paper className = {classes.active}>{node.val}</Paper>
                    <Grid container justify="center">
                        <Grid item xs = {6}>{left}</Grid>
                        <Grid item xs = {6}>{right}</Grid>
                    </Grid>
                </Grid>
            )
        }
        return (
            <Grid container justify="center">
                <Paper className = {classes.node}>{node.val}</Paper>
                <Grid container justify="center">
                    <Grid item xs = {6}>{left}</Grid>
                    <Grid item xs = {6}>{right}</Grid>
                </Grid>
            </Grid>
        )
    }
    return (
        <Box pt = {5} pb={2} width = "94.6%">
            {dfs(props.root)}
        </Box>
    );
}