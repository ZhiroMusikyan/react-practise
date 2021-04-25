import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MyAppBar(props) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(props.loggedIn);
  }, [props.loggedIn]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {!!isLoggedIn && (
            <>
              <Menu ClassName={classes.menuButton} />
              <Typography variant="h6" className={classes.title}>
                News
              </Typography>
            </>
          )}
          <Button color="inherit" onClick={props.onClick}>
            {props.btnName}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
