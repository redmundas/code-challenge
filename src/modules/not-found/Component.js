import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from './styled';

export default () => (
  <Container>
    <div>
      <Typography align="center" component="h3" variant="h2">
        404
      </Typography>
      <Typography align="center" component="h3" variant="h5">
        Page not found
      </Typography>
    </div>
  </Container>
);
