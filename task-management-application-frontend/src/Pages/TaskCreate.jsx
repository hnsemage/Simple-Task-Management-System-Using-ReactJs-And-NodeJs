import React, { useState } from 'react';
import { Container,Button, TextField, FormControl, Box, Typography, MenuItem,styled } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const BlackMenuItem = styled(MenuItem)({
  backgroundColor: '#314247', // Set the background color to black
  '&:hover': {
    backgroundColor: '#314247', // Keep the background color black on hover
  },
  '&.Mui-selected': {
    backgroundColor: '#314247', // Set the selected item background color
  },
  
});


function TaskCreate(){

    const navigate = useNavigate();

    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
  
    const [taskNameErr, setTaskNameErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [startDateErr, setStartDateErr] = useState(false);
    const [endDateErr, setEndDateErr] = useState(false);
    const [taskStatusErr, setTaskStatusErr] = useState(false);

    const [messageTaskNameErr, setMessageTaskNameErr] = useState("");
    const [messageDescriptionErr, setMessageDescriptionErr] = useState("");
    const [messageUsernameErr, setMessageUsernameErr] = useState("");
    const [messageStartDateErr, setMessageStartDateErr] = useState("");
    const [messageEndDateErr, setMessageEndDateErr] = useState("");
    const [messagetTaskStatusErr, setMessagetTaskStatusErr] = useState("");

    const [recheckFormMessage, setRecheckFormMessage] = useState('');

    const [taskStatusTypes, setTaskStatusTypes] = useState(['Pending','Completed']);

    const handleFirstDropDownChange=(event) =>{
      const selectedType = event.target.value;
      setTaskStatus(selectedType);}

    const handleSubmit = async (e) => {
    
      //e.preventDefault();
    
        setTaskNameErr(false);
        setDescriptionErr(false);
        setUsernameErr(false);
        setStartDateErr(false);
        setEndDateErr(false);
        setTaskStatusErr(false);
    
        if (taskName === "") {
          setTaskNameErr(true);
          setMessageTaskNameErr("Task Name Required");
        } else {
            setMessageTaskNameErr("");
        }

        if (description === "") {
          setDescriptionErr(true);
          setMessageDescriptionErr("Task Name Required");
        } else {
            setMessageDescriptionErr("");
        }
    
        if (username === "") {
          setUsernameErr(true);
          setMessageUsernameErr("Username Required");
        } else {
            setMessageUsernameErr("");
        }
    
        if (startDate === "") {
          setStartDateErr(true);
          setMessageStartDateErr("Start Date Required");
        } else {
          setMessageStartDateErr("");
        }
    
        if (endDate === "") {
          setEndDateErr(true);
          setMessageEndDateErr("End Date Required");
        }else {
          setMessageEndDateErr("");
        }
    
        if (taskStatus === "") {
            setTaskStatusErr(true);
            setMessagetTaskStatusErr("Task Status Required");
        }else {
            setMessagetTaskStatusErr("");
        }
        
        if (taskName === "" || description === ""|| username === "" || startDate === "" || endDate === "" || taskStatus === "" ) {
          setRecheckFormMessage('Recheck The Form');
        } else {
          setRecheckFormMessage('');
        }

        try {
          // Send the registration data to the backend
          const response = await axios.post(
              'http://localhost:8080/api/CreateTasks',
              {
                  taskName,
                  description,
                  username,
                  startDate,
                  endDate,
                  taskStatus
              }
          );
      
          console.log('Task creation successful:', response.data);
          navigate('/');
      
      } catch (error) {
              console.error('Task creation failed:', error);
              setUsernameErr(false);
              setMessageUsernameErr(''); 
          
      }
    }

    return(
        <Container>
            <Box textAlign="center" m={4}>
                <Typography variant="h5" gutterBottom style={{ fontFamily: "Inika", fontSize: 58, fontWeight: "bold", color: "#f7f7f7" }}>
                    Register
                </Typography>
                <form>
                    <TextField
                    name="taskname"
                    label="Task Name"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6",
                    '&.Mui-focused': {
                      borderColor: '#314247',
                    }, }}
                    fullWidth
                    required
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    error={taskNameErr}
                    helperText={messageTaskNameErr}/>
                    <br/>
                    <TextField
                    name="description"
                    label="Description"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6"}}
                    fullWidth
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={descriptionErr}
                    helperText={messageDescriptionErr}/>
                    <br/>
                    <TextField
                    name="username"
                    label="Username"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6"}}
                    fullWidth
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameErr}
                    helperText={messageUsernameErr}/>
                    <br/>
          
                    <TextField
                    name="startDate"
                    type="date"
                    label="Start Date"
                    id="filled-search"
                    variant="filled"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 14 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                    fullWidth
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    error={startDateErr}
                    helperText={messageStartDateErr}/>
                    <br/>
                    <TextField
                    name="endDate"
                    label="End Date"
                    id="filled-search"
                    variant="filled"
                    type="date"
                    InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 14 },
                    }}
                    inputProps={{ style: { color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}}
                    sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                    fullWidth
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    error={endDateErr}
                    helperText={messageEndDateErr}/>
                    <br/>
                    <FormControl fullWidth  variant="standard" >
                      <TextField
                      select
                      label="Task Status"
                      InputLabelProps={{
                        style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                      }}
                      inputProps={{ style: { color: "black", fontSize: 20 } }}
                      sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                      id="filled-search"
                      variant="filled"
                      name="taskStatus"
                      value={taskStatus}
                      required
                      error={taskStatusErr}
                      helperText={messagetTaskStatusErr}
                      onChange={handleFirstDropDownChange} >
                        {taskStatusTypes.map((type) => (
                        <BlackMenuItem key={type} value={type}>
                          <span style={{ color: "#cca4a6",fontFamily: "Inika", fontSize: 20 }}>{type}</span>
                        </BlackMenuItem>
                        ))}
                        </TextField>
                    </FormControl>
                    <br/>
                    <Button
                    
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    color="primary"
                    sx={{
                        m: 3,
                        backgroundColor: "#647973",
                        "&:hover": {
                        backgroundColor: "#314247", // Set the background color on hover
                        },
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 20,
                        }}>
                            Create
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/viewalltasks')}
                    sx={{
                        m: 3,
                        backgroundColor: "#647973",
                        "&:hover": {
                        backgroundColor: "#314247", // Set the background color on hover
                        },
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 20,
                    }}>
                        View Tasks
                    </Button>
                    <Typography
                    variant="body2"
                    sx={{
                        color: 'red',
                        fontWeight: 'bold',
                        fontFamily: 'Inika',
                        fontSize: 16,
                    }}>
                        {recheckFormMessage}
                    </Typography>
  
                </form>
            </Box>
        
        </Container>
    );
}
export default TaskCreate;