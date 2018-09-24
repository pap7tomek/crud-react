import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import MainPage from '../components/MainPage'
import Login from '../components/Login'
import DataPickers from '../components/DatePickers'
import Registration from '../components/Registration'
const AppRouter = () => (
      <Switch>
        <Route exact={true} path="/" component={MainPage} />
        <Route path="/link" component={Login} /> 
        <Route path="/test" component={DataPickers} />
        <Route path="/registration" component={Registration} />
      </Switch>
);

export default AppRouter;
