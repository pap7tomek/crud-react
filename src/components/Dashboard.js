import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {getServerPath} from '../config';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import TranslateButton from './TranslateButton';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    width: '80%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    width: '18%',
    height: '90%',
    marginTop: '50px'
  }
});

class SimpleTable extends React.Component {
  state = {
    note:'',
    notes:[]
  }
  onNoteChange = (e) => {
    if(e.target.value === '\n') return;
    const note = e.target.value;
    this.setState(() => ({note}));
  }
  componentDidMount(){
    fetch(getServerPath() + 'api/all', {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("crud-tomek")
      }   
    })
    .then((response => response.json()))
    .then((json)=> {
      json.data.forEach(element => {
        const data = {
          id: element._id,
          text: element.text
        };
        this.setState({notes: [...this.state.notes, data]})
      });
    })
  }
  deleteFromTable = (id) => {
    let filteredArray = this.state.notes.filter(item => item.id != id);
    this.setState({notes: filteredArray});
  }
  saveNote = async () => {
    const data = {
      note: this.state.note
    }
    fetch(getServerPath() + 'api/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("crud-tomek")
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
        if(response.status === "error"){
          throw response.status;
        }else {
          const newNote = {
            id: response.data._id,
            text: this.state.note
          }
          this.setState({notes: [...this.state.notes, newNote]});
          this.setState({note: ""});
        }
        
    }).catch((err) => {
        localStorage.setItem("crud-tomek", null);
        this.setState({error: "Wrong username or password", status:'error'});
        console.log(err);
    })
  }
  keyPress = async (e) => {
    console.log(this.state.note.length);
    if(e.keyCode == 13 && this.state.note != "" && this.state.note != "\n") {
      this.saveNote();
    }
  }
  render() {
    let counter = 0;
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <TextField
            id="outlined-multiline-static"
            label="Your note"
            multiline
            rows="4"
            onChange={this.onNoteChange}
            className={classes.textField}
            value={this.state.note}
            onKeyDown={this.keyPress}
            margin="normal"
            variant="outlined"
          />
          <Button onClick={this.saveNote} variant="contained" size="large" color="primary" className={classes.button}>
            Save
          </Button>
        </Paper>
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.state.notes.map(row => {
                return (
                <TableRow key={counter++}>
                    <TableCell component="th" scope="row">
                    {counter}
                    </TableCell>
                      <EditButton text={row.text} id={row.id}></EditButton>
                    <TableCell>
                      <DeleteButton id={row.id} deleteFromTable={this.deleteFromTable}></DeleteButton> 
                    </TableCell>
                    <TableCell>
                      <TranslateButton id={row.id} text={row.text}></TranslateButton>
                    </TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
        </Paper>
      </div>
    );
  } 
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);