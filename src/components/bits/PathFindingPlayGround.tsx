import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { 
  addObs, 
  chooseStartPoint, 
  chooseEndPoint, 
  begin, 
  obsforward,
  reScale,
  obsReset 
} from '../../slices/Backtracking';
import { Container, Row, Col ,Button, Input } from 'reactstrap';
import Tile from './Tile';

export const PathFindingPlayGround = (props:{board:number[][]; choice:number}) =>{
  
  const dispatch = useAppDispatch();
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
      const curCoord = { r:i , c:j }, height = `${100/props.board.length}%`;
      let name = "", val = "H";
      switch(props.board[i][j]){
        case -1:
          val = '0';
          name = 'blank';
          break;
        case 0:
          val = '?';
          name = 'chosen';
          break;
        case 1:
          val = 'Q';
          name = 'queen';
          break;
        case 2:
          val = 'O';
          name = 'obs';
          break;
        case 3:
          name = 'visited';
          break;
        case 4:
          name = 'path';
      }
      row.push(<Tile coord = {curCoord} val = {val} height = {height} width = {height} name = {name} onChange = {changeHandler}/>);
    }
    tiles.push(<Row>{row}</Row>)
  }
  return <Container key = {props.choice}>
            {tiles}
          </Container>
}