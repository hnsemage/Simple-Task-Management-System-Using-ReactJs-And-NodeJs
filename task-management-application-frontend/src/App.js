import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from "./NavigationBar/NavigationBar";
import TaskCreate from "./Pages/TaskCreate";
import ViewAllTasks from "./Pages/ViewAllTasks";


function App() {
  return (
    <div>
      <Router>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<TaskCreate/>}/>
          <Route path='/viewalltasks' element={<ViewAllTasks/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
