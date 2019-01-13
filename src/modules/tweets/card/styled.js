import styled from '@emotion/styled';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

export const Wrapper = styled(Card)({
  marginBottom: 16,
});

export const Actions = styled(CardActions)({
  display: 'flex',
  justifyContent: 'flex-end',
});

export const Link = styled.a({
  textDecoration: 'none',
  color: '#3f51b5',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
});
