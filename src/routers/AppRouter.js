import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import Registration from '../components/Registration'
const AppRouter = (props) => (
      <Switch>
        <Route exact={true} path="/" component={MainPage} />
        <Route path="/login" render={()=><Login handleChangeLogin={props.handleChangeLogin}/>} /> 
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/registration" component={Registration} />
      </Switch>
);

export default AppRouter;
