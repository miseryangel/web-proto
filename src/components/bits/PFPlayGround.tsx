import { useAppDispatch } from '../../app/hooks';
import { 
    bfsAddObs,
    bfsChooseStartPoint,
    bfsChooseEndPoint,
} from '../../slices/PathFinding';
import { Grid } from '@material-ui/core';
import Tile from './Tile';
import { pathFindingStyles } from '../styles/pathFindingStyle';

export const PFPlayGround = (props:{board:number[][]; choice:number}) =>{
    const classes = pathFindingStyles();
    const dispatch = useAppDispatch();
    const changeHandler = (coord:{r:number,c:number}) =>{
      console.log(props.choice);
      switch(props.choice){
        case 0:
          dispatch(bfsChooseStartPoint(coord));
          break;
        case 1:
          dispatch(bfsChooseEndPoint(coord));
          break;
        case 2:
          dispatch(bfsAddObs(coord));
          break;
      }
    };

    let tiles = [];
    for (let i = 0; i < props.board.length; i++){
      let row = [];
      for (let j = 0; j < props.board[0].length; j++){
        const curCoord = { r:i , c:j };
        row.push(<Tile coord = {curCoord} val = {props.board[i][j]} dir = {-1} onChange = {changeHandler}/>);
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