import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {Link} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: 'none',
  }
});

function ItemList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <Link className={classes.link}to="/test"><ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Pokemon finder" />
        </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Tłumacz" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}

ItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemList);