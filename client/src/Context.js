import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// Exporting a HOC to manage authUser, Data & actions in other components
export const Context = React.createContext(); 

export class Provider extends Component {
  // Initializing data from Data.js & Cookies Library to preserve authUser
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
  }
  // Initializing states 
  state = {
    authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    courses: null,
    course: null
  };

  render() {
    const { authenticatedUser, course, courses } = this.state;
    // Value props to be pass to consuming components
    const value = {
      authenticatedUser,
      course,
      courses,
      data: this.data,
      actions: { // Add the 'actions' property and object
        signIn: this.signIn,
        signOut: this.signOut
      },
      
    };
    
    return (
      // All consumers that are descendants of the Provider will re-render 
      // whenever the Provider’s value prop changes.
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // Function to sign In an user
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        user.password = password;
        return {
          authenticatedUser: user,
        };
      });
      // Set cookie to preserve authUser for a day
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  // Function to sign out an user
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    // Remove Cookies
    Cookies.remove('authenticatedUser');
  }

}
// Using this component lets you subscribe to a context within a function component.
export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}