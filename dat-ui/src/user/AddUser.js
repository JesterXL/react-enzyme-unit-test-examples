import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fetch from 'cross-fetch';
import { every, some } from 'lodash/fp'
import {
    validUsername,
    validEmail,
    validPassword,
    isValid
} from './validators'
import { sha256 } from 'js-sha256';
import SigningUp from './SigningUp'
import SuccessfulSignup from './SuccessfulSignup'

const style = {
    margin: 12,
  };

const errorTextStyle = {
    color: '#F44336'
}

export class AddUser extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          clean: true,
          signUp: 'editing',
          username: '',
          email: '',
          password: ''
      }
    }

    onUsernameChange = event => this.setState({ username: event.target.value })
    onUsernameBlur = event => {
        const username = event.target.value
        return validUsername(username).matchWith({
            Failure: ({value}) => this.setState({username, usernameErrors: value.join(' '), clean: false}),
            Success: () => this.setState({username, usernameErrors: undefined, clean: false})
        })
    }
    onEmailChange = event => this.setState({ email: event.target.value })
    onEmailBlur = event => {
        const email = event.target.value
        validEmail(email).matchWith({
            Failure: ({value}) => this.setState({email, emailErrors: value.join(' '), clean: false}),
            Success: () => this.setState({email, emailErrors: undefined, clean: false})
        })
    }
    onPasswordChange = event => this.setState({ password: event.target.value })
    onPasswordBlur = event => {
        const password = event.target.value
        validPassword(password).matchWith({
            Failure: ({value}) => this.setState({password, passwordErrors: value.join(' '), clean: false}),
            Success: () => this.setState({password, passwordErrors: undefined, clean: false})
        })
    }

    isClean = () => this.state.clean

    hasErrors = () =>
        some(item => item !== undefined, [
            this.state.usernameErrors,
            this.state.emailErrors,
            this.state.passwordErrors
        ])

    formIsValid = () =>
        every(isValid, [
            validUsername(this.state.username),
            validEmail(this.state.email),
            validPassword(this.state.password)
        ])
    
    onAddUser = (username, email, password) => {
        this.setState({signUp: 'loading', signUpError: undefined})
        return fetch(`http://localhost:8080/user/add`, {
            method: 'post',
            body: JSON.stringify({username, email, password: sha256(password)}),
            headers: {'content-type': 'application/json'}
        })
        .then(result => result.json())
        .then(result => {
            if(result.result === true) {
                this.setState({signUp: 'success'})
            } else {
                this.setState({signUp: 'error', signUpError: result.error.message})
            }
            return result
        })
        .catch(error => {
            console.log("onAddUser::error:", error);
            this.setState({signUp: 'error', signUpError: error.message})
        });
    }

    reset() {
        this.setState({
            signUp: 'editing', 
            signUpError: undefined,
            clean: true, 
            username: undefined,
            usernameErrors: undefined,
            email: undefined,
            emailErrors: undefined,
            password: undefined,
            passwordErrors: undefined
        })
    }
  
    render() {
        const signUpState = this.state.signUp
        
        if(signUpState === 'loading') {
            return (<SigningUp />)
        }

        if(signUpState === 'success') {
            return (<SuccessfulSignup onClickSignUpAgain={this.reset.bind(this)} />)
        }

        const disabled = this.hasErrors() || this.isClean() || this.formIsValid() === false
        return (
            <Card style={style}>
                <CardTitle title="Sign Up" subtitle="Beware! The valiations below are t3h brutal." />
                <CardText>
                    <p style={errorTextStyle}>{this.state.signUpError}</p><br/>
                    <TextField floatingLabelText="Username" value={this.state.username} errorText={this.state.usernameErrors} onChange={this.onUsernameChange} onBlur={this.onUsernameBlur}
                    /><br />

                    <TextField floatingLabelText="Email" value={this.state.email} hintText="jesterxl@jessewarden.com" errorText={this.state.emailErrors} onChange={this.onEmailChange} onBlur={this.onEmailBlur}
                    /><br />

                    <TextField floatingLabelText="Password" value={this.state.password} type="password" errorText={this.state.passwordErrors} onChange={this.onPasswordChange} onBlur={this.onPasswordBlur}
                    /><br />

                    <br />
                </CardText>
                <CardActions>
                <RaisedButton label="Submit" primary={true} fullWidth={true} disabled={disabled} onClick={() => {
                    this.onAddUser(this.state.username, this.state.email, this.state.password);
                }}/>
            </CardActions>
            </Card>
      );
    }
  }


export default AddUser;