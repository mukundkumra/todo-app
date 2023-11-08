import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import axios from 'axios';
import { useParams } from "react-router-dom";

function ToDoForm() {
  const { username } = useParams();
  const [inputText, setInputText] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();
    await axios.post(`/api/tasks/${username}`, { newItem: inputText, user: username }).then(response => {
      setInputText('');
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div>
      <form className="add-item" onSubmit={handleAddTask}>
        <input
          type="text"
          name="newItem"
          placeholder="New Item"
          autoComplete="off"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        <Fab color='secondary' className='add' type="submit"><AddIcon /></Fab>
      </form>
    </div>
  );
}

export default ToDoForm;
