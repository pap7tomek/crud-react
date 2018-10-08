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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class SimpleTable extends React.Component {
  state = {
    note:''
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
    /*
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
    })*/
  }
  render() {
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
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell numeric>Calories</TableCell>
                <TableCell numeric>Fat (g)</TableCell>
                <TableCell numeric>Carbs (g)</TableCell>
                <TableCell numeric>Protein (g)</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map(row => {
                return (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                    {row.name}
                    </TableCell>
                    <TableCell numeric>{row.calories}</TableCell>
                    <TableCell numeric>{row.fat}</TableCell>
                    <TableCell numeric>{row.carbs}</TableCell>
                    <TableCell numeric>{row.protein}</TableCell>
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