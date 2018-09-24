import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const MainPage = () => (
  <Grid container>
    <Grid item sm={8}>
    <Typography variant="display3" gutterBottom>
      Witam, mam na imię Tomek
    </Typography>
    <Typography variant="display1" gutterBottom>
        To moja pierwsza aplikacja napisana w reacie. 
    </Typography>
    <Typography variant="display1" gutterBottom>
      Użyte technologie i frameworki: 
    </Typography>
    <Typography variant="headline" gutterBottom>
        Frontend:
    </Typography>
    <Typography variant="body2" gutterBottom>
      JavaScript
    </Typography>
    <Typography variant="body2" gutterBottom>
      ReactJS
    </Typography>
    <Typography variant="body2" gutterBottom>
      Material-ui
    </Typography>
    <Typography variant="body2" gutterBottom>
      CSS
    </Typography>
    <Typography variant="headline" gutterBottom>
      Backend:
    </Typography>
    <Typography variant="body2" gutterBottom>
      Node.js
    </Typography>
    <Typography variant="body2" gutterBottom>
      MongoDB
    </Typography>
    <Typography variant="headline" gutterBottom>
      Inne:
    </Typography>
    <Typography variant="body2" gutterBottom>
      Webpack
    </Typography>
    </Grid>
    <Grid item sm={4}>
      <img style={{height:'800px'}}src="/images/coffee.jpg"></img>
    </Grid>  
  </Grid>
);

export default MainPage;