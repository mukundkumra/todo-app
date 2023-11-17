import React from "react";
import ToDoHeader from "../components/ToDoHeader";
import CompletedList from "../components/CompletedList";
import { Fab } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams } from "react-router-dom";

function CompletedListPage() {
  const { username } = useParams();

  return (
    <div>
      <ToDoHeader title={`${username}'s Completed Items`} />
      <CompletedList />
      <div className="home-container">
        <Fab variant="extended" color="secondary" href={`/todo-list/${username}`}>{<ArrowBackIosNewIcon />}Return</Fab>
      </div>
    </div>
  );
}

export default CompletedListPage;