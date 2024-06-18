import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

function Todo(props) {
  return (
    
    <List className="todo__list">
        <ListItem><ListItemText primary={props.text} ></ListItemText></ListItem>
        </List>
  );
}

export default Todo;
