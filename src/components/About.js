import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-50px",
    marginLeft: "-50px",
    width: "100px",
    height: "100px",
  },
  container: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100vh",
    minHeight: "100vh",
  },
});

export default  () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Form ABOUT</h1>
    </div>
  );
}
