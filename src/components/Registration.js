import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {serverPath} from '../config';
import validator from 'validator';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
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
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
  });
class Login extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        repassword: '',
        error: '',
        open: false,
    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }
    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }
    onRePasswordChange = (e) => {
        const repassword = e.target.value;
        this.setState(() => ({repassword}));
    }
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }
    checkRegister = () => {
        if(this.state.name === "" || this.state.email === "" || this.state.password === "") {
            const error = "Fill all fields"
            this.setState(() => ({error}));
            return false
        }else if(!validator.isEmail(this.state.email)){
            const error = "Wrong email";
            this.setState(() => ({error}));
            return false
        }else if(this.state.password!==this.state.repassword){
            const error = "Passwords doesn't match";
            this.setState(() => ({error}));
            return false
        }else{
            const error = "";
            this.setState(() => ({error}));
            return true
        }
        
    }
    send = async () => {
        console.log(this.state.name);
        console.log(this.state.password);
        const data = {
            username: this.state.name,
            password: this.state.password,
            email: this.state.email
        }
        fetch(serverPath + 'auth/registration', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }    
        })
        .then(response => response.json())
        .then((response) => {
            if(response.status === false){
                this.setState({error: response.message})
            }
        })
        
    } 
    onLoginClick = async () => {
        if(this.checkRegister()){
            console.log("czemu to tu jest");
            this.send();
        }else {
            this.setState({open: true});
        }
    }
    cleanError = () => {
        this.setState({error:""})
    }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.loginForm}>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        className={classes.formControl}
                        id="username"
                        label="Username"
                        onChange={this.onNameChange}
                    />
                    <TextField
                        className={classes.formControl}
                        id="email"
                        label="E-mail"
                        type="email"
                        onChange={this.onEmailChange}
                    />
                    <TextField
                        className={classes.formControl}
                        id="password"
                        label="Password"
                        type="password"
                        onChange={this.onPasswordChange}
                    />
                    <TextField
                        className={classes.formControl}
                        id="rePassword"
                        label="Repeat Password"
                        type="password"
                        onChange={this.onRePasswordChange}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={[classes.button, classes.buttonBlue]}
                        onClick={this.onLoginClick}
                    >
                        Sing up
                    </Button>
                    {this.state.error&&<MySnackbarContentWrapper
                        variant="error"
                        message={this.state.error}
                        onClose={this.cleanError}
                    />}
                </form>
        </div>
        );
    }
}
  
export default withStyles(styles)(Login);