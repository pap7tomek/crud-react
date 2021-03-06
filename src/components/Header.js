import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ItemList from './ItemList';
import AppRouter from '../routers/AppRouter';
import Button from '@material-ui/core/Button';
import {getServerPath} from '../config';
import { BrowserRouter, Link } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 940,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  link: {
    textDecoration: 'none',
    color: '#FFF',
    '&:hover' : {
      color: '#FFF'
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class Header extends React.Component {
  state = {
    isLogged: false,
    open: false,
    anchor: 'left',
  };
  componentWillMount = () => {
    const token = {
      token: localStorage.getItem("crud-tomek")
    };
    if(localStorage.getItem("crud-tomek") === "null" || localStorage.getItem("crud-tomek") === null){
      return;
    }
    fetch(getServerPath() + 'auth/check', {
        method: 'POST',
        body: JSON.stringify(token),
        headers:{
            'Content-Type': 'application/json'
        }    
    })
    .then((response) => {
        if(response.status === 403){
            throw 403;
        }else{
            return response.json();
        }
    })
    .then((response) => {
        this.setState({isLogged:true});
    }).catch((err) => {
        localStorage.setItem("crud-tomek", null);
    })

  }
  handleChangeLogin = () => {
    this.setState({ isLogged: true });
  }
  handleChangeLogout = () => {
    localStorage.setItem("crud-tomek", null);
    this.setState({ isLogged: false});
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;
    const drawer = (
      
      <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <ItemList></ItemList>   
        <Divider />
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === 'left') {
      before = drawer;
    } else {
      after = drawer;
    }
    let loginButton;
    if(!this.state.isLogged) {
      loginButton = <Link className={classes.link} to='/login'><Button  className={classes.button} color="inherit">Login</Button></Link>;
    }else {
      loginButton = <Link className={classes.link} to='/'><Button onClick={this.handleChangeLogout} className={classes.button} color="inherit">Logout</Button></Link>;
    }
    return (
      <BrowserRouter>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar position="static"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/" className={classes.link} style={{ flex:1 }}><Typography variant="title" style={{ flex: 1 }} color="inherit" noWrap>
                CRUD
              </Typography></Link>
              {loginButton}
            </Toolbar>
          </AppBar>
          {before}
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <AppRouter handleChangeLogin={this.handleChangeLogin}></AppRouter>
          </main>
          {after}
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);