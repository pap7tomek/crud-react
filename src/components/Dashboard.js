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
    notes:["aaaaaaaaaaaaaaa","bbbbbbbbbbbbbbbbbb"]
  }
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }
  saveNote = async () => {

    const data = {
      token: localStorage.getItem("crud-tomek"),
      note: this.state.note
    }
    fetch(getServerPath() + 'api/add', {
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
            return response.json();
        }
    })
    .then((response) => {
        console.log("aaaaa");
        this.setState({notes: [...this.state.notes, this.state.note]});
        this.setState({note: ""});
    }).catch((err) => {
        localStorage.setItem("crud-tomek", null);
        this.setState({error: "Wrong username or password", status:'error'});
        console.log(err);
    })
  }
  render() {
    let counter = 0;
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            onChange={this.onNoteChange}
            className={classes.textField}
            value={this.state.note}
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
                <TableCell numeric>Note</TableCell>
                <TableCell numeric>Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.state.notes.map(row => {
                return (
                <TableRow key={counter++}>
                    <TableCell component="th" scope="row">
                    {counter}
                    </TableCell>
                    <TableCell numeric>{row}</TableCell>
                    <TableCell numeric>aaa</TableCell>
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