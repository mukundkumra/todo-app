import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleTaskDelete = (taskId) => {
    axios.delete(`/api/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(task => task._id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="box">
      {tasks.map(task => (
        <div key={task._id} className="item">
          <input
            type="checkbox"
            name="checkbox"
            onChange={() => handleTaskDelete(task._id)}
          />
          <p>{task.task}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
