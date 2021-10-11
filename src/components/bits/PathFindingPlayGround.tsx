import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  addObs, 
  chooseStartPoint, 
  chooseEndPoint, 
} from '../../slices/Backtracking';
import { Grid } from '@material-ui/core';
import Tile from './Tile';
import { pathFindingStyles } from '../styles/pathFindingStyle';

export const PathFindingPlayGround = (props:{board:number[][]; choice:number}) =>{
    const classes = pathFindingStyles();
    const dispatch = useAppDispatch();
    const path = useAppSelector(state => state.backtracking.path);
    const pathMap = Object.fromEntries(
      path.map(({r,c,d})=>[r+"$"+c,d])
    );
    console.log(pathMap);
    const changeHandler = (coord:{r:number,c:number}) =>{
      console.log(props.choice);
      switch(props.choice){
        case 1:
          dispatch(chooseStartPoint(coord));
          break;
        case 2:
          dispatch(chooseEndPoint(coord));
          break;
        case 3:
          dispatch(addObs(coord));
          break;
      }
    };

    let tiles = [];
    for (let i = 0; i < props.board.length; i++){
      let row = [];
      for (let j = 0; j < props.board[0].length; j++){
        const curCoord = { r:i , c:j }, key = curCoord.r+"$"+curCoord.c, dir = (key in pathMap)?pathMap[key]:-1;
        console.log(dir);
        row.push(<Tile coord = {curCoord} val = {props.board[i][j]} dir = {dir} onChange = {changeHandler}/>);
      }
      tiles.push(<Grid container  alignItems="center" justifyContent="center">
                    <div className={classes.root}>
                      {row}
                    </div>
                  </Grid>)
    }
    return <Grid container key = {props.choice}>
                {tiles}
            </Grid>
}