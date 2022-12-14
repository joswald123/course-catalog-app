import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  // initial state of user & errors
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div >
        <div className="form--centered">
          <h2>Sign Up</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => ( // render prop
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                  <input 
                  id="lastName" 
                  name="lastName" 
                  type="text"
                  value={lastName} 
                  onChange={this.change} 
                  placeholder="Last Name" />
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
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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
  // Create a nwe user for authentication
  submit = () => {
        const { context } = this.props;
        const {
        firstName,
        lastName,
        emailAddress,
        password,
        } = this.state; 

        // New user payload
        const user = {
          firstName,
          lastName,
          emailAddress,
          password,
        };
        // user authentication API request method 'POST'
        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                  // console.log(`${emailAddress} is successfully signed up and authenticated!`);
                  context.actions.signIn(emailAddress, password)
                    .then(() => {
                      this.props.history.push('/')
                    });
                    
                }
            })
            .catch( err => { // handle rejected promises
                // console.log(err);
                this.props.history.push('/error'); // push to history stack
            });  
    }
  // Function that redirects to home page  
  cancel = () => {
    this.props.history.push('/');
  }
}