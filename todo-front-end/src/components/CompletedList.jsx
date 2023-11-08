import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import { useParams } from "react-router-dom";

function CompletedList() {
  const { username } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`/api/completed-tasks/${username}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  });

  const handleTaskDelete = (taskId) => {
    axios.delete(`/api/completed-tasks/${taskId}`)
      .then(response => {
        if (tasks.length === 1) {
        setTasks([]); // Clear the completed tasks in your state
      } else {
        setTasks(tasks.filter(task => task._id !== taskId));
      }})
      .catch(error => {
        console.error(error);
      });
  }

  const handleDeleteAllCompletedTasks = () => {
  axios.delete(`/api/completed-tasks/${username}/all`)
    .then(response => {
      // Assuming you have a state variable named 'completedTasks' to represent the completed tasks
      setTasks([]); // Clear the completed tasks in your state
    })
    .catch(error => {
      console.error(error);
    });
}

  return (
    <div className="box">
      {tasks.map(task => (
        <div key={task._id} className="item completed-item">
          <p>{task.task}</p>
          <IconButton onClick={() => handleTaskDelete(task._id)}>
              <DeleteIcon color="secondary" />
          </IconButton>
        </div>
      ))}
      <div className="home-container clear"><Button onClick={() => handleDeleteAllCompletedTasks()} color='secondary' variant="contained" startIcon={<DeleteIcon />}>Clear All</Button></div>
    </div>
  );
}

export default CompletedList;