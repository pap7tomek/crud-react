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
/*
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: false
    };
  }
  click() {
    console.log("dupa");
    this.setState({isLoading:false});
  }
  download() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(data => this.setState({ data, isLoading: true }))
  }
  componentDidMount() {
    this.download();
  }
  render() {
    console.log(this.state.data);
    return (
      <div>
        <h1>{this.state.isLoading ? this.state.data.name: "Ładuje się"}</h1>
        <Button onClick={this.click.bind(this)} variant="contained" color="primary">
          {this.state.isLoading ? "widzisz" : "niewidzisz"}
        </Button>
        <button onClick={this.download.bind(this)}> Download </button>
      </div>
    )
  }

}*/

ReactDOM.render(<App></App>, document.getElementById('app'));
