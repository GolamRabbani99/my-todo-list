

import React, { useEffect, useState } from "react";

import "./App.css";
import TodoItem from "./Todo";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { collection, onSnapshot, query, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(""); // remembering input

  async function addTodo(event) {
    event.preventDefault(); // prevent automatic submit

    // Add a new todo document to Firestore
    try {
      await addDoc(collection(db, "todos"), {
        text: input,
        timestamp: new Date(),
      });
      setInput(""); // clear up input field
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsub();
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form>
        <FormControl>
          <InputLabel>Enter your task</InputLabel>
          <Input
            id="my-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
        >
          Add Todo
        </Button>
      </form>

      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
}

export default App;
