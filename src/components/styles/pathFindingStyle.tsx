import { makeStyles,Theme } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";
import white from "@material-ui/core/colors/yellow";
import { brown, blue, green, red, purple } from "@material-ui/core/colors";

export const pathFindingStyles = makeStyles((theme:Theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      outline:"2px solid white",
      "& > *": {
        margin: theme.spacing(0.1),
        width: theme.spacing(5),
        height: theme.spacing(5),
        backgroundColor: yellow[300],
        textAlign: "center",     
        padding: theme.spacing(1)
      },
    },
    blank :{
        backgroundColor:blue[700],
    },
    visited:{
        backgroundColor:green[700],
    },
    start:{
        backgroundColor:red[200],
    },
    end:{
        backgroundColor:purple[200],
    },
    obstacle:{
        backgroundColor:brown[500],
    },
    path:{
        backgroundColor: yellow[200],
    }
}));