import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  // initial state of user & errors
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }
  // Function for change events
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // Sending an existing user for authentication
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    // user authentication API request method 'GET'
    context.actions.signIn(emailAddress, password)
        .then(user => {
            if(user === null) {
                this.setState(() => {
                    return { errors: [ 'Sign-in was unsuccessful' ] };  
                });
            } else {
                this.props.history.push(from);
                // console.log(`SUCCESS! ${emailAddress} is now signed in!`);
            }
        })
        .catch( err => {
            console.log(err);
            this.props.history.push('/error');
          })

  }
  // Function that redirects to home page
  cancel = () => {
    this.props.history.push('/');
  }
}