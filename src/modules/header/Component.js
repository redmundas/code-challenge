import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EtaIcon from '@material-ui/icons/AlternateEmail';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Space, Wrapper } from './styled';

const Header = ({ editMode, onToggleEditMode }) => (
  <Wrapper>
    <AppBar position="fixed" color="default">
      <Toolbar>
        <EtaIcon />
        <Typography variant="h6" color="inherit">
          Tweets
        </Typography>
        <Space />
        <FormControlLabel
          control={
            <Switch
              checked={editMode}
              onChange={onToggleEditMode}
              value="checkedB"
              color="primary"
            />
          }
          label="Edit mode"
        />
      </Toolbar>
    </AppBar>
  </Wrapper>
);

Header.propTypes = {
  editMode: PropTypes.bool,
  onToggleEditMode: PropTypes.func.isRequired,
};

export default Header;
