import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getServerPath} from '../config';
import {Link} from 'react-router-dom';
import MySnackbarContentWrapper from './MySnackbarContentWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Redirect} from 'react-router-dom';
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
    progress: {
        margin: '20px auto 0 auto;',
    }
  });
  
class Login extends React.Component {

    state = {
        name: '',
        password: '',
        error: '',
        status: '',
        redirect: false
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
        const data = {
            username: this.state.name,
            password: this.state.password
        }
        fetch(getServerPath() + 'auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }    
        })
        .then((response) => {
            if(response.status === 403){
                throw 403;
            }else{
                this.props.handleChangeLogin();
                return response.json();
            }
        })
        .then((response) => {
            localStorage.setItem("crud-tomek", response.token);
            this.setState({error: "Hi again!!!", status:'success'});
            setTimeout(() => this.setState({redirect: true}), 3000);
        }).catch((err) => {
            localStorage.setItem("crud-tomek", null);
            this.setState({error: "Wrong username or password", status:'error'});
            console.log(err);
        })
    } 
    cleanError = () => {
        this.setState({error:"", status:""});
    }
    onLoginClick = async () => {
        this.send();
    }
    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };
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
                        id="password"
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
                    {this.state.error&&<MySnackbarContentWrapper
                        variant={this.state.status}
                        message={this.state.error}
                        onClose={this.cleanError}
                    />}
                    {this.state.status === "success" &&
                    <CircularProgress className={classes.progress} size={70} />}
                    {this.state.redirect &&
                    <Redirect to="/dashboard" />}
                </form>
        </div>
        );
    }
}
  
export default withStyles(styles)(Login);