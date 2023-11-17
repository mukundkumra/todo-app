import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Fab } from '@mui/material';
import axios from 'axios';
import { useParams } from "react-router-dom";

function ToDoList() {
  const { username } = useParams();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState('');
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    axios.get(`/api/tasks/${username}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [username]);

  const handleTaskDelete = (taskId) => {
    axios.delete(`/api/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  }

   const handleEditTask = (taskId) => {
    setEditingTask(taskId);
    const taskToEdit = tasks.find(task => task._id === taskId);
    setUpdatedText(taskToEdit.task);
  };

  const handleUpdateTask = () => {
    axios.put(`/api/tasks/${editingTask}`, { updatedText })
      .then(response => {
        setTasks(tasks.map(task => {
          if (task._id === editingTask) {
            return { ...task, task: updatedText };
          }
          return task;
        }));
        setEditingTask(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

return (
  <div>
    <div>
      {tasks.map(task => (
        <div key={task._id} className="item">
          <input
            type="checkbox"
            name="checkbox"
            onChange={() => {handleTaskDelete(task._id);}}
          />
          {editingTask === task._id ? (
            <div>
              <input
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
              />
              <Fab color='secondary' onClick={handleUpdateTask}><CheckIcon/></Fab>
              <Fab color='secondary' onClick={() => setEditingTask(null)}><ClearIcon/></Fab>
            </div>
          ) : (
            <div>
              <p>{task.task}</p>
              <Fab color="secondary" onClick={() => handleEditTask(task._id)}>
                <EditIcon />
              </Fab>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
          }

export default ToDoList;
