import { makeStyles,Theme } from "@material-ui/core/styles";
import { yellow, green, red, purple } from "@material-ui/core/colors";

export const nQueenStyles = makeStyles((theme:Theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      outline:"2px solid white",
      "& > *": {
        margin: theme.spacing(0.1),
        width: theme.spacing(5),
        height: theme.spacing(5),
        textAlign: "center",     
        padding: theme.spacing(1)
      },
    },
    even :{
        backgroundColor:yellow[100],
    },
    odd:{
        backgroundColor:green[300],
    },
    chosen:{
        backgroundColor:red[200],
    },
    queen:{
        backgroundColor:purple[200],
    },
    imageIcon: {
        height: '100%',
    },
    iconRoot: {
        textAlign: 'center',
    },
    marginAutoItem: {
        margin: 'auto'
    },
}));