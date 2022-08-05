import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';


import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';

import withContext from "./Context";


const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);



function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
            <Route exact path="/" component={() => <Courses />}/>
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="courses/:id" component={CourseDetailWithContext} />
            <Route path="updateCourse/:id" component={UpdateCourse} />
            <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
