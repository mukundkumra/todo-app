import React from "react";
import ToDoHeader from "../components/ToDoHeader";
import ToDoList from "../components/ToDoList"
import ToDoForm from "../components/ToDoForm";
import { Button } from "@mui/material";

import { useParams } from "react-router-dom";

function ToDoListPage() {
  const { username } = useParams();

  return (
    <div>
      <ToDoHeader title={`${username}'s To-Do List`} />
      <ToDoForm/>
      <ToDoList/>
      <div className="home-container">
        <Button variant="contained" color="secondary" href={`/completed-list/${username}`}>Completed Items</Button>
        <Button variant="contained" color="secondary" href="/">Logout</Button>
      </div>
    </div>
  );
}

export default ToDoListPage;