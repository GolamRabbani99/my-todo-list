import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function TodoItem({ todo }) {
  const [editable, setEditable] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditToggle = () => {
    setEditable(!editable);
    setEditText(todo.text);
  };

  const handleEditChange = (event) => {
    setEditText(event.target.value);
  };

  const handleUpdateTodo = async () => {
    try {
      await updateDoc(doc(db, "todos", todo.id), {
        text: editText,
      });
      setEditable(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteDoc(doc(db, "todos", todo.id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <List className="todo__list">
      <ListItem>
        {editable ? (
          <TextField value={editText} onChange={handleEditChange} fullWidth />
        ) : (
          <>
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={handleEditToggle}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleDeleteTodo}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </>
        )}
        {editable && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTodo}
          >
            Update
          </Button>
        )}
      </ListItem>
    </List>
  );
}

export default TodoItem;
