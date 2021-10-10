import { makeStyles,Theme } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

export const radixStyles = makeStyles((theme:Theme) => ({
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
    active:{
      backgroundColor: yellow[700],
    },
    node: {
      backgroundColor: yellow[300],
    },
}));