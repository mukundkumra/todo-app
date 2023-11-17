import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ToDoListPage from '../pages/ToDoListPage'
import CompletedListPage from '../pages/CompletedListPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo-list/:username" element={<ToDoListPage />} />
        <Route path="/completed-list/:username" element={<CompletedListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
