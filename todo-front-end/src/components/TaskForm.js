import React, { useState } from 'react';
import axios from 'axios';

// function TaskForm() {
//   const [inputText, setInputText] = useState('');

//   const handleAddTask = () => {
//     axios.post('http://localhost:3000/api/tasks', { newItem: inputText })
//       .then(response => {
//         setInputText('');
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   return (
//     <div className="box">
//       <form className="item">
//         <input
//           type="text"
//           name="newItem"
//           placeholder="New Item"
//           autoComplete="off"
//           value={inputText}
//           onChange={e => {setInputText(e.target.value);console.log(e.target.value);}}/>
//         <button type="button" onClick={handleAddTask}>+</button>
//       </form>
//     </div>
//   );
// }

function TaskForm() {
  const [inputText, setInputText] = useState('');

  const handleAddTask = async(e) => {
    e.preventDefault();
    await axios.post('/api/tasks', { newItem: inputText }).then(response => {
      setInputText('');
      window.location.reload();
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <div className="box">
      <form className="item" onSubmit={handleAddTask}>
        <input
          type="text"
          name="newItem"
          placeholder="New Item"
          autoComplete="off"
          value={inputText}
          onChange={e => {setInputText(e.target.value);console.log(e.target.value);}}/>
        <button type="submit" >+</button>
      </form>
    </div>
  );
}

export default TaskForm;
