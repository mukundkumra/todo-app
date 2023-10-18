import React from 'react';
import './App.css'; // You can import your CSS or styles here
import TaskHeader from './components/TaskHeader';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {

  return (
    <div className="App">
      <TaskHeader />
      <TaskList />
      <TaskForm />
    </div>
  );
}

export default App;
