import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {props.children.map((item) => {
        const labelId = `checkbox-list-label-${item.id}`;
        return (
          <ListItem key={item.id} button>
            <ListItemText id={labelId} primary={item.value} />
            <ListItemText id={labelId} primary={item.value} />
            <ListItemSecondaryAction>
              <IconButton
                color="primary"
                className={classes.margin}
                onClick={() => props.onEdit(item.id)}
              >
                <EditIcon />
              </IconButton>
              <Checkbox
                edge="end"
                onChange={() => props.onChange(item)}
                checked={props.checked.indexOf(item) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
