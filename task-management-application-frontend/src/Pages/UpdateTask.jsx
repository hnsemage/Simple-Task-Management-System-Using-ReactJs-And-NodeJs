import React, { useState,useEffect } from 'react';
import { Container,Button, TextField, FormControl, Box, Typography, MenuItem,styled } from "@mui/material";
import axios from 'axios';
import { useNavigate,useParams, useLocation } from "react-router-dom";


const BlackMenuItem = styled(MenuItem)({
  backgroundColor: '#314247', // Set the background color to black
  '&:hover': {
    backgroundColor: '#314247', // Keep the background color black on hover
  },
  '&.Mui-selected': {
    backgroundColor: '#314247', // Set the selected item background color
  },
  
});


function UpdateTask(){

    const navigate = useNavigate();
    const{taskId} = useParams();
    const location = useLocation();
    
    const [task,setTask] = useState({
        taskName:"",
        description:"",
        username:"",
        startDate:"",
        endDate:"",
        taskStatus:"",
    });

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                console.log(`http://localhost:8080/api/TaskById/${taskId}`);
                const response = await axios.get(`http://localhost:8080/api/TaskById/${taskId}`);
                setTask(response.data);
            } catch (error) {
                console.log('Error when fetching task details:', error);
            }
        };
    
        fetchTaskDetails();
    }, [taskId]);
    
      
  
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
      setTask({...task, taskStatus:selectedType});
    }

    const handleSubmit = async (e) => {
    
      //e.preventDefault();
    
        setTaskNameErr(false);
        setDescriptionErr(false);
        setUsernameErr(false);
        setStartDateErr(false);
        setEndDateErr(false);
        setTaskStatusErr(false);
    
        if (task.taskName === "") {
          setTaskNameErr(true);
          setMessageTaskNameErr("Task Name Required");
        } else {
            setMessageTaskNameErr("");
        }

        if (task.description === "") {
          setDescriptionErr(true);
          setMessageDescriptionErr("Description Required");
        } else {
            setMessageDescriptionErr("");
        }
    
        if (task.username === "") {
          setUsernameErr(true);
          setMessageUsernameErr("Username Required");
        } else {
            setMessageUsernameErr("");
        }
    
        if (task.startDate === "") {
          setStartDateErr(true);
          setMessageStartDateErr("Start Date Required");
        } else {
          setMessageStartDateErr("");
        }
    
        if (task.endDate === "") {
          setEndDateErr(true);
          setMessageEndDateErr("End Date Required");
        }else {
          setMessageEndDateErr("");
        }
    
        if (task.taskStatus === "") {
            setTaskStatusErr(true);
            setMessagetTaskStatusErr("Task Status Required");
        }else {
            setMessagetTaskStatusErr("");
        }
        
        if (task.taskName === "" || task.description === ""|| task.username === "" || task.startDate === "" || task.endDate === "" || task.taskStatus === "" ) {
          setRecheckFormMessage('Recheck The Form');
        } else {
          setRecheckFormMessage('');

          try {
            await axios.put(`http://localhost:8080/api/UpdateTask/${taskId}`, task);
        } catch (error) {
            console.log("Error in updating task: ", error);
            navigate('/');
        }
        
        }
    };

    return(
        <Container>
            <Box style={{ textAlign: 'center', }} m={4}>
                <Typography variant="h5" gutterBottom style={{ fontFamily: "Inika", fontSize: 58, fontWeight: "bold", color: "#f7f7f7" }}>
                    Update Task
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
                    value={task.taskName}
                    onChange={(e) => setTask({ ...task, taskName: e.target.value })}
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
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
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
                    value={task.username}
                    onChange={(e) => setTask({ ...task, username: e.target.value })}
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
                    value={task.startDate}
                    onChange={(e) => setTask({ ...task, startDate: e.target.value })}
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
                    value={task.endDate}
                    onChange={(e) => setTask({ ...task, endDate: e.target.value })}
                    error={endDateErr}
                    helperText={messageEndDateErr}/>
                    <br/>
                    <FormControl fullWidth  variant="standard" >
                        <TextField
                        name="taskStatus"
                        select
                        label="Task Status"
                        InputLabelProps={{
                            style: { color: "#cca4a6", fontWeight: "bold", fontFamily: "Inika", fontSize: 20 },
                        }}
                        inputProps={{ style: { color: "black", fontSize: 20 } }}
                        sx={{ borderRadius: "10px", borderColor: "#cca4a6" }}
                        variant="filled"
                        fullWidth
                        required
                        value={task.taskStatus}
                        error={taskStatusErr}
                        helperText={messagetTaskStatusErr}
                        onChange={handleFirstDropDownChange}
                        >
                            {taskStatusTypes.map((type) => (
                            <BlackMenuItem key={type} value={type}>
                                <span style={{ color: "#cca4a6", fontFamily: "Inika", fontSize: 20 }}>{type}</span>
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
                        backgroundColor: "#314247", 
                        },
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 20,
                        }}>
                            Update
                    </Button>
                    <Button
                    type="submit"
                    variant="contained"
                    onClick={navigate('/')}
                    color="primary"
                    sx={{
                        m: 3,
                        backgroundColor: "#647973",
                        "&:hover": {
                        backgroundColor: "#314247", 
                        },
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Inika",
                        fontSize: 20,
                        }}>
                            Back
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
export default UpdateTask;