import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: null,
    courses: null,
    course: null
  };

  constructor() {
    super();
    this.data = new Data();
    this.state = this.state
  }
  

  render() {
    const { authenticatedUser, course, courses } = this.state;

    const value = {
      authenticatedUser,
      course,
      courses,
      data: this.data,
      actions: { // Add the 'actions' property and object
        signIn: this.signIn,
      
      },
      
    };
    
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    return user;
  }

  // signIn = async (emailAddress, password) => {
  //   const user = await this.data.getUser(emailAddress, password);
  //   if (user !== null) {
  //     this.setState(() => {
  //       user.password = password;
  //       return {
  //         authenticatedUser: user,
  //       };
  //     });
  //     // Set cookie
  //     // Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
  //   }
  //   return user;
  // }

  // Function to sign out a user
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    // Cookies.remove('authenticatedUser');
  }
}

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