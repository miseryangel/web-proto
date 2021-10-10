import { makeStyles,Theme } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";
import { brown, red } from "@material-ui/core/colors";

export const redBlackStyles = makeStyles((theme:Theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.1),
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: 25,
        verticalAlign: "middle",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
    },
    red: {
      backgroundColor: red[700],
    },
    redActive: {
      backgroundColor: red[200],
    },
    black: {
      backgroundColor: brown[400],
    },
    blackActive: {
      backgroundColor: brown[100],
    }
  }));