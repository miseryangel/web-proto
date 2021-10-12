import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"; 
import yellow from "@material-ui/core/colors/yellow";

export const linkedListStyles = makeStyles((theme:Theme) => createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
      }
    },
    node:{
      backgroundColor: yellow[100],
      borderRadius: 25,
      width:theme.spacing(3),
      height:theme.spacing(3),
    },
    active:{
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      borderRadius: 25,
      backgroundColor: yellow[700],
      textAlign: "center",     
    }
  }));
