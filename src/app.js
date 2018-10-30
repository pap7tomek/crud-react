import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter'
import 'normalize.css'
import { Provider } from 'react-redux';
import Button from '@material-ui/core/Button';
import Header from './components/Header'
const App = () => (
  <Header />
);

ReactDOM.render(<App></App>, document.getElementById('app'));
