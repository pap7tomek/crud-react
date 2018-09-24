import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {serverPath} from '../config';
import {Link} from 'react-router-dom';
const styles = theme => ({
    link: {
      textDecoration: 'none',
    },  
    container: {
      display: 'flex',
      width: '300px',
      flexDirection: 'column',
    },
    loginForm: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    formControl: {
        marginTop: '20px',
    },
    button: {
        marginTop: '30px',
    },
    buttonBlue: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        width: '100%',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '10px'
    }
  });
class Login extends React.Component {
    state = {
        name: '',
        password: '',
        error: ''
    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }
    send = async () => {
        console.log(this.state.name);
        console.log(this.state.password);
        const data = {
            username: this.state.name,
            email: this.state.password
        }
        fetch(serverPath + 'auth/registration', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }    
        })
        .then(response => response.json())
        .then(response => console.log(response))
        
    } 
    onLoginClick = async () => {
        this.send();
    }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.loginForm}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        className={classes.formControl}
                        id="standard-name"
                        label="Username"
                        onChange={this.onNameChange}
                    />
                    <TextField
                        className={classes.formControl}
                        id="standard-name"
                        label="Password"
                        type="password"
                        onChange={this.onPasswordChange}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.onLoginClick}
                    >
                        Login
                    </Button>
                    <Link className={classes.link} to="/registration">
                        <Button 
                            variant="contained" 
                            color="#6fbf73" 
                            className={[classes.button , classes.buttonBlue]}
                        >
                            Registration
                        </Button> 
                    </Link>
                </form>
        </div>
        );
    }
}
  
export default withStyles(styles)(Login);