import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ViewAllTasks() {
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState([]);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    fetchTasks();

    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/AllTasks');
      setTaskData(response.data);
    } catch (error) {
      console.log('Error when fetching tasks: ', error);
    }
  };

  const handleUpdate = async (taskId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/updateStatus/${taskId}`, { newStatus });
      // Update the local state to reflect the changes
      const updatedTasks = taskData.map(task => {
        if (task.taskId === taskId) {
          return { ...task, taskStatus: newStatus };
        }
        return task;
      });
      setTaskData(updatedTasks);
      console.log(`Update status button clicked for Task ID: ${taskId}`);
    } catch (error) {
      console.error('Error occurred when updating task status: ', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/DeleteTask/${taskId}`);
      // Update the local state to reflect the changes
      setTaskData(prevTaskData => prevTaskData.filter(record => record.taskId !== taskId));
      console.log(`Delete button clicked for Task ID: ${taskId}`);
    } catch (error) {
      console.error('Error occurred when deleting task: ', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTasks([]);
      return;
    }

    const filtered = taskData.filter((task) => {
      return task.taskId.toString().includes(query) || task.taskStatus.toLowerCase().includes(query.toLowerCase()) || task.username.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredTasks(filtered);
  };

  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    if (e.target.value === 'status') {
      const sorted = [...taskData].sort((a, b) => a.taskStatus.localeCompare(b.taskStatus));
      setTaskData(sorted);
    } else if (e.target.value === 'none') {
      setTaskData(taskData.sort((a, b) => a.taskId - b.taskId)); // Sort by taskId
    } else if (e.target.value === 'username') {
      setTaskData(taskData.sort((a, b) => a.username.localeCompare(b.username)));
    } else if (e.target.value === 'startDate') {
      setTaskData(taskData.sort((a, b) => a.startDate.localeCompare(b.startDate)));
    } else if (e.target.value === 'endDate') {
      setTaskData(taskData.sort((a, b) => a.endDate.localeCompare(b.endDate)));
    }
  }

  const tasksToDisplay = searchQuery ? filteredTasks : taskData;

  return (
    <Container>
      <Box style={{ textAlign: 'center' }}>
        <Typography variant="h3" style={{ fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
          All Tasks
        </Typography>
        <TextField
          label="Search"
          variant='filled'
          value={searchQuery}
          onChange={handleChange}

          style={{ marginBottom: '20px', marginRight: '20px' }}
          sx={{
            width: "20ch",
            backgroundColor: "#BADFE7",
            color: "black",
            fontWeight: "bold",
            fontFamily: "Inika",
            fontSize: 20,
            borderRadius: '10px'
          }} />
        <FormControl variant="outlined" style={{ marginBottom: '16px' }}>
          <Select
            value={sortOption}
            onChange={handleSortChange}

            sx={{
              width: "20ch",
              backgroundColor: "#BADFE7",
              color: "black",
              fontWeight: "bold",
              fontFamily: "Inika",
              fontSize: 20,
              borderRadius: '10px'
            }}
          >
            <MenuItem value="none" selected>Sort By</MenuItem>
            <MenuItem value="status">Task Status</MenuItem>
            <MenuItem value="username">Username</MenuItem>
            <MenuItem value="startDate">Start Date</MenuItem>
            <MenuItem value="endDate">End Date</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper} style={{ backgroundColor: "rgba(186, 223, 231, 0.7)", textAlign: 'center' }} sx={{ maxWidth: 1500, marginLeft: 3, marginRight: 10, marginBottom: 2, borderRadius: 2 }} align="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">Task ID</TableCell>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">Task Name</TableCell>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">Description</TableCell>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">Username</TableCell>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">Start Date</TableCell>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">End Date</TableCell>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">Task Status</TableCell>
              <TableCell style={{ border: '1px solid white', fontWeight: 'bold', fontSize: '15px' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasksToDisplay.map((task, index) => (
              <TableRow key={index}>
                <TableCell style={{ border: '1px solid white' }} align="center">{task.taskId}</TableCell>
                <TableCell style={{ border: '1px solid white' }} align="center">{task.taskName}</TableCell>
                <TableCell style={{ border: '1px solid white' }} align="center">{task.description}</TableCell>
                <TableCell style={{ border: '1px solid white' }} align="center">{task.username}</TableCell>
                <TableCell style={{ border: '1px solid white' }} align="center">{task.startDate}</TableCell>
                <TableCell style={{ border: '1px solid white' }} align="center">{task.endDate}</TableCell>
                <TableCell style={{ border: '1px solid white' }} align="center">
                  <FormControl>
                    <Select
                      value={task.taskStatus}
                      onChange={(e) => handleUpdate(task.taskId, e.target.value)}
                      sx={{
                        backgroundColor: "#BADFE7",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 15,
                      }}>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell style={{ border: '1px solid white' }} align="center">
                  <Button variant="contained" onClick={() => handleDelete(task.taskId)}
                    sx={{
                      backgroundColor: "#314247",
                      color: "#BADFE7",
                      fontFamily: "Inika",
                      fontSize: 15,
                    }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/adminPage/${username}`)}
          sx={{
            m: 3,
            width: "20ch",
            backgroundColor: "#647973",
            "&:hover": {
              backgroundColor: "#314247", // Set the background color on hover
            },
            color: "black",
            fontWeight: "bold",
            fontFamily: "Inika",
            fontSize: 20,
          }}>
          Back
        </Button>
      </Box>
    </Container>
  );
}

export default ViewAllTasks;
