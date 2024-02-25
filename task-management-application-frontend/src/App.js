import React from "react"; // Import React library
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
// Import components
import NavigationBar from "./NavigationBar/NavigationBar";
import TaskCreate from "./Pages/TaskCreate";
import ViewAllTasks from "./Pages/ViewAllTasks";
import UpdateTask from "./Pages/UpdateTask";

function App() {
  return (
    <div>
      {/* Set up BrowserRouter for routing */}
      <Router> 
        <NavigationBar/>  {/* Render NavigationBar component */}
        <Routes>
          {/* Define routes for different pages */}
          <Route path='/' element={<TaskCreate/>}/>
          <Route path='/viewalltasks' element={<ViewAllTasks/>}/>
          <Route path='/update/:taskId' element={<UpdateTask/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
