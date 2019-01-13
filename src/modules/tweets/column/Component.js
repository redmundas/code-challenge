import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import LeftIcon from '@material-ui/icons/ArrowBack';
import RightIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import { Arrows, Field, Header, Link, OrderLabel } from './styled';
import Card from '../card';

const Column = ({
  source,
  disabledLeft,
  disabledRight,
  data,
  editMode,
  tweetsCount,
  onChangeTweetsCount,
  onMoveLeft,
  onMoveRight,
}) => (
  <>
    <Header>
      <Link href={`https://twitter.com/${source}`} target="_blank">
        @{source}
      </Link>
      {editMode &&
        <Arrows>
          <IconButton
            disabled={disabledLeft}
            disableRipple
            onClick={onMoveLeft}
            color="inherit"
          >
            <LeftIcon />
          </IconButton>
          <OrderLabel>Change position</OrderLabel>
          <IconButton
            disabled={disabledRight}
            disableRipple
            onClick={onMoveRight}
            color="inherit"
          >
            <RightIcon />
          </IconButton>
        </Arrows>}
      {editMode &&
        <Field>
          <TextField
            name={`tweetsCount-${source}`}
            label="Number of tweets"
            value={tweetsCount}
            onChange={onChangeTweetsCount}
            type="number"
            margin="dense"
            variant="outlined"
          />
        </Field>}
    </Header>
    {data && data.map(tweet =>
      <Card key={tweet.id} {...tweet} />)}
    {!data && <div style={{ textAlign: 'center' }}>Loading...</div>}
    {data && !data.length && <div style={{ textAlign: 'center' }}>No tweets</div>}
  </>
);

Column.propTypes = {
  source: PropTypes.string.isRequired,
  disabledLeft: PropTypes.bool,
  disabledRight: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  editMode: PropTypes.bool,
  tweetsCount: PropTypes.number,
  onChangeTweetsCount: PropTypes.func.isRequired,
  onMoveLeft: PropTypes.func.isRequired,
  onMoveRight: PropTypes.func.isRequired,
};

export default Column;
