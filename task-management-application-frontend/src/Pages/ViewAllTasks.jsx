import React,{ useState, useEffect } from "react"; // Import necessary modules from React
// Import material-ui components
import { Container,Box,Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Button, TextField,FormControl,Select,MenuItem } from "@mui/material";
import axios from 'axios';  // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

function ViewAllTasks(){

    const navigate = useNavigate(); // Initialize useNavigate hook


    // Define state variables
    const [taskData, setTaskData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [sortOption, setSortOption] = useState('none');

    useEffect(() =>{
        fetchTasks();// Fetch tasks data when component mounts
    },[]);

    // Function to fetch task data from the API
    const fetchTasks = async() =>{
        try{
            const response = await axios.get('http://localhost:8080/api/AllTasks');
            setTaskData(response.data);
        }catch(error){
          // Log error if fetching tasks fails
            console.log('Error when fetching tasks: ',error);
        }
    };

    // Function to handle update button click
    const handleUpdate = (taskId) => {
      try{
        const selectedTask = taskData.find((task) => task.taskId === taskId)
        navigate(`/update/${taskId}`, { state: { from: "ViewAllTasks", task: selectedTask } });
        console.log(`Update button clicked for Task ID: ${taskId}`);
      }catch (error){
        // Log error if updating a task fails
        console.error('Error occurred when updating task information: ', error);
      }
    };


    // Function to handle updating task status
    const handleStatusChange = async (taskId, newStatus) => {
      try {
        // Make an API call to update only the task status
        await axios.put(`http://localhost:8080/api/UpdateTask/${taskId}`, { taskStatus: newStatus });
        // Update the local taskData with the new status
        setTaskData(prevTaskData =>
          prevTaskData.map(task =>
            task.taskId === taskId ? { ...task, taskStatus: newStatus } : task
          )
        );
        console.log(`Task ID ${taskId} status changed to ${newStatus}`);
      } catch (error) {
        // Log error if updating a task status fails
        console.error('Error occurred when updating task status: ', error);
      }
    };
    
    // Function to handle task deletion
    const handleDelete = async(taskId) => {
        try{
          await axios.delete(`http://localhost:8080/api/DeleteTask/${taskId}`);
          // Update the local state to reflect the changes
          setTaskData((prevTaskData) => prevTaskData.filter((record) => record.taskId !== taskId));
          console.log(`Delete button clicked for Task ID: ${taskId}`);
        } catch (error) {
          // Log error if deleting a task fails
          console.error('Error occurred when deleting task: ', error);
        };
      };
      
      // Function to handle search input
      const handleSearch = (query) => {
        try{
          setSearchQuery(query);
          if (!query) {
            setFilteredTasks([]);
            return;
          }
    
          const filtered = taskData.filter((task) => {
            return task.taskId.toString().includes(query) || task.taskStatus.toLowerCase().includes(query.toLowerCase()) || task.username.toLowerCase().includes(query.toLowerCase());
          });
          setFilteredTasks(filtered);
        }catch (error) {
          // Log error if filtering fails
          console.error('Error occurred when filtering task: ', error);
        }
      };
    
      const handleChange = (e) => {
        handleSearch(e.target.value);
      };

      // Function to handle sorting tasks
      const handleSortChange = (e) =>{
        try{
          setSortOption(e.target.value);
          if(e.target.value === 'status'){
            const sorted = [...taskData].sort((a,b) => a.taskStatus.localeCompare(b.taskStatus));
            setTaskData(sorted);
          } else if (e.target.value === 'none') {
            setTaskData(taskData.sort((a, b) => a.taskId - b.taskId)); // Sort by taskId
          } else if (e.target.value === 'username') {
            setTaskData(taskData.sort((a, b) => a.username.localeCompare(b.username)));
          }else if (e.target.value === 'startDate') {
            setTaskData(taskData.sort((a, b) => a.startDate.localeCompare(b.startDate)));
          }else if (e.target.value === 'endDate') {
            setTaskData(taskData.sort((a, b) => a.endDate.localeCompare(b.endDate)));
          }
        }catch(error){
          // Log error if sorting fails
          console.error('Error occurred when sorting task: ', error);
        }
      }
      
    const tasksToDisplay = searchQuery ? filteredTasks : taskData;// Determine tasks to display based on search query

    return(
        <Container>
            <Box style={{ textAlign: 'center' }}>
              {/* Display header */}
            <Typography variant="h3" style={{fontFamily: "Inika", fontSize: 45, fontWeight: "bold", color: "#C0C2E3", }} component="div" gutterBottom>
                All Tasks
            </Typography>

            {/* Search input */}
            <TextField
            label="Search"
            variant='filled'
            value={searchQuery}
            onChange={handleChange}
            style={{marginBottom:'20px', marginRight:'20px'}}
            sx={{
              width: "20ch",
              backgroundColor: "#BADFE7",
              color: "black",
              fontWeight: "bold",
              fontFamily: "Inika",
              fontSize: 20,
              borderRadius:'10px'
            }}/>

            {/* Dropdown for sorting tasks */}
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
                borderRadius:'10px'
              }}>
                <MenuItem value="none" selected>Sort By</MenuItem>
                <MenuItem value="status">Task Status</MenuItem>
                <MenuItem value="username">Username</MenuItem>
                <MenuItem value="startDate">Start Date</MenuItem>
                <MenuItem value="endDate">End Date</MenuItem>
              </Select>
            </FormControl>
            </Box>

            {/* Display tasks in a table */}
            <TableContainer component={Paper} style={{backgroundColor: "rgba(186, 223, 231, 0.7)",textAlign: 'center'}} sx={{ maxWidth: 1500,marginLeft:3,marginRight:10,marginBottom:2,borderRadius:2}} align="center">
                <Table>
                    <TableHead>
                      {/* Table header */}
                        <TableRow>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task ID</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task Name</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Description</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Username</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Start Date</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">End Date</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Task Status</TableCell>
                            <TableCell style={{ border: '1px solid white',fontWeight: 'bold', fontSize: '15px'}} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Map through tasks and display each one */}
                        {tasksToDisplay.map((task,index)=>(
                            <TableRow key={index}>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.taskId}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.taskName}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.description}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.username}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.startDate}</TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">{task.endDate}</TableCell>
                                <TableCell style={{ border: '1px solid white' }} align="center">
                                  {/* Dropdown menu for selecting task status */}
                                  <FormControl variant="outlined">
                                    <Select
                                    value={task.taskStatus}
                                    onChange={(e) => handleStatusChange(task.taskId, e.target.value)}
                                    sx={{
                                      backgroundColor: "#BADFE7",
                                      color: "black",
                                      fontWeight: "bold",
                                      fontFamily: "Inika",
                                      fontSize: 15,
                                      borderRadius:'10px'
                                      }}>
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Completed">Completed</MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell style={{ border: '1px solid white'}} align="center">
                                  {/* Buttons for updating and deleting tasks */}
                                  <Button 
                                  variant="contained" onClick={() => handleUpdate(task.taskId)} style={{ margin: '8px' }}
                                  sx={{
                                    backgroundColor: "#314247",
                                    color: "#BADFE7",
                                    fontFamily: "Inika",
                                    fontSize: 15,
                                  }}>
                                    Update
                                  </Button>
                                  <Button
                                  variant="contained" onClick={() => handleDelete(task.taskId)}
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
            {/* Button to navigate back */}
            <Box textAlign="center">
              <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/`)}
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

export default ViewAllTasks; // Export the ViewAllTasks component