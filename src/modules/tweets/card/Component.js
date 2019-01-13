import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Actions, Wrapper } from './styled';
import DateFormat from '../../../lib/components/date-format';

const Card = ({ text, url, createdAt }) => (
  <Wrapper>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        <DateFormat value={createdAt} />
      </Typography>
      <Typography component="p" variant="body2">
        {text}
      </Typography>
    </CardContent>
    <Actions>
      <Button
        disableRipple
        variant="outlined"
        size="small"
        color="primary"
        href={url}
        component="a"
        target="_blank"
      >
        View Tweet
      </Button>
    </Actions>
  </Wrapper>
);

Card.propTypes = {
  text: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Card;
