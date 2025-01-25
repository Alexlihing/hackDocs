import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, List, ListItem, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Custom styles for the button
const useStyles = makeStyles((theme) => ({
  greenButton: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: '#388e3c',  // Darker green when hovered
    },
  },
}));

const LogFood = () => {
  const [foodName, setFoodName] = useState('');  // State for food name input
  const [foodList, setFoodList] = useState([]);  // State for storing logged food items

  const classes = useStyles();  // Use custom styles

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add the food name to the list if not empty
    if (foodName.trim() !== '') {
      setFoodList([...foodList, foodName]);
      setFoodName('');  // Clear input after submission
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Food Logger
      </Typography>

      {/* Food logging form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Food Name"
              variant="outlined"
              fullWidth
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}  // Update the foodName state
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button type="submit" variant="contained" className={classes.greenButton} fullWidth>
              Log Food
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Display logged food items */}
      <Paper style={{ marginTop: '20px', padding: '10px' }}>
        <Typography variant="h6">Logged Food Items:</Typography>
        <List>
          {foodList.map((food, index) => (
            <ListItem key={index}>{food}</ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default LogFood;