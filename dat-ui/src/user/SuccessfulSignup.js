import React from 'react';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12
}
const SucessfulSignup = ({onClickSignUpAgain}) => (
  <Card style={style}>
    <CardTitle title="Signup Complete!" subtitle="Thank you for taking the time to do so." />
    <CardActions>
      <RaisedButton secondary={true} label="Sign Up Again?" fullWidth={true} onClick={onClickSignUpAgain} />
    </CardActions>
  </Card>
);

export default SucessfulSignup