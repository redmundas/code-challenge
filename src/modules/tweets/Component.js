import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Container } from './styled';
import Column from './column';

const Tweets = ({ sources }) => (
  <Container>
    <Grid container spacing={24}>
      {sources && sources.map((source, idx) => (
        <Grid item xs={12} sm={12 / sources.length} key={source}>
          <Column
            source={source}
            disabledLeft={idx === 0}
            disabledRight={idx === (sources.length - 1)}
          />
        </Grid>
      ))}
    </Grid>
  </Container>
);

Tweets.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.string),
};

export default Tweets;
