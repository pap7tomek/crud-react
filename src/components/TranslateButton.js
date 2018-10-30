import React from 'react';
import Button from '@material-ui/core/Button';
import {getServerPath} from '../config';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class TranslateButton extends React.Component {
    state = {
        translate: "",
        open: false
    }
    translateNote = async () => {
        const data = {
            id: this.props.id,
          }
          fetch(getServerPath() + 'api/translate', {
              method: 'POST',
              body: JSON.stringify(data),
              headers:{
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem("crud-tomek")
              }    
          })
          .then((response) => {
              return response.json();
          }).then((response)=> {
              this.setState({
                  translate: response.text,
                  open: true
              })
          })
    }
    
    handleClose = () => {
        this.setState({ open: false });
      };
    render() {
        return(
            <div>
                <Button onClick={this.translateNote} variant="contained" color="secondary">
                    Translate
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.translate}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default TranslateButton;