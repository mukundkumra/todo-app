import React from "react";
import Button from '@mui/material/Button';
import ToDoHeader from "../components/ToDoHeader";

function Home() {
  return (
    <div>
      <ToDoHeader title="To-Do List" />
      <div className="home-container">
        <Button variant="contained" color="secondary" href="/login">Login</Button>
        <Button variant="contained" color="secondary" href="/register">Register</Button>
      </div>
    </div>
  );
}

export default Home;