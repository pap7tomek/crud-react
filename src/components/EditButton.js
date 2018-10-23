import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import {getServerPath} from '../config'
import InputBase from '@material-ui/core/InputBase';
class EditButton extends React.Component {
    state = {
        text: this.props.text,
        status : true
    }
    onTextChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({text}));
    }
    editNote = async () => {
        const data = {
          text: this.state.text,
          _id: this.props.id
        }
        fetch(getServerPath() + 'api/edit', {
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
                //this.props.deleteFromTable(this.props.id);
                return response.json();
            }
        })
    }
    keyPress = async (e) => {
        if(e.keyCode == 13 && this.state.text != "" && this.state.note != "\n") {
          this.editNote();
          this.setState({status:true});
        }
    }
    blur = async (e) => {
        this.setState({status:true});
        this.editNote();
    }
    render() {
        return(
                <TableCell  onClick={()=>{this.setState({status:false})}} numeric>{this.state.status ? this.state.text: <InputBase
                    id="standard-name"
                    value={this.state.text}
                    autoFocus="true"
                    onChange={this.onTextChange}
                    onKeyDown={this.keyPress}
                    onBlur={this.blur}
                  />}
                  </TableCell>

        )
    }
}
export default EditButton;