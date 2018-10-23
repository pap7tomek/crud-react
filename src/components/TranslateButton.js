import React from 'react';
import Button from '@material-ui/core/Button';
import {getServerPath} from '../config';
class TranslateButton extends React.Component {
    translateNote = async () => {
        const data = {
            text: this.props.text,
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
              console.log(response);
          })
    }
    render() {
        return(
            <div>
                <Button onClick={this.translateNote} variant="contained" color="secondary">
                    Translate
                </Button>
            </div>
        )
    }
}
export default TranslateButton;