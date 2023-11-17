import React from "react";
import ToDoHeader from "../components/ToDoHeader";
import { Button } from "@mui/material";
import UserLogin from "../components/UserLogin";

function Login() {
  return (
    <div>
      <ToDoHeader title="Login" />
      <UserLogin />
      <div className="home-container">
        <Button variant="contained" color="secondary" href="/">Home</Button>
        <Button variant="contained" color="secondary" href="/register">Register</Button>
      </div>
    </div>
  );
}

export default Login;