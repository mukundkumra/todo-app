import React from "react";
import ToDoHeader from "../components/ToDoHeader";
import UserRegister from "../components/UserRegister";
import { Button } from "@mui/material";

function Register() {
  return (
    <div>
      <ToDoHeader title="Register" />
      <UserRegister />
      <div className="home-container">
        <Button variant="contained" color="secondary" href="/">Home</Button>
        <Button variant="contained" color="secondary" href="/login">Login</Button>
      </div>
    </div>
  );
}

export default Register;