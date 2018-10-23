import React from 'react';
import Button from '@material-ui/core/Button';
import {getServerPath} from '../config'
class DeleteButton extends React.Component {
    deleteNote = async () => {
        const data = {
          _id: this.props.id
        }
        fetch(getServerPath() + 'api/delete', {
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
                this.props.deleteFromTable(this.props.id);
                return response.json();
            }
        })
    }
    render() {
        return(
            <div>
                <Button onClick={this.deleteNote} variant="contained" color="secondary">
                    Delete
                </Button>
            </div>
        )
    }
}
export default DeleteButton;