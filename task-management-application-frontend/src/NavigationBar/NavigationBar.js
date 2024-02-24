// NavigationBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Info as InfoIcon, AccountCircle as ProfileIcon } from '@mui/icons-material';

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#314247' }} elevation={0}>
      <Toolbar>
      <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: '#f7f7f7', textDecoration: 'none', fontFamily: 'Orelega One', fontSize: 30 }}>
          
        </Typography>
        <IconButton color="inherit" component={Link} to="/"><HomeIcon style={{ fontSize: 30 }}/></IconButton>
        <IconButton color="inherit" component={Link} to="/register"><ProfileIcon style={{ fontSize: 30 }}/></IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
