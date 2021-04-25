import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  fullScreen: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100vh",
    minHeight: "100vh",
  },
}));


export default () => {
const classes = useStyles();

  return (
    <>
      <div className={classes.fullScreen}>MY HOME PAGE </div>
    </>
  );
}
