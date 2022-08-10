import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// Components
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import PrivateRoute from './PrivateRoute';


// Context Component
import withContext from "./Context";

// Components with Context 
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const createCourseWithContext = withContext(CreateCourse);
const updateCourseWithContext = withContext(UpdateCourse);

// Path Routes 
function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />
        <Switch>
            <Route exact path="/" component={() => <Courses />}/>
            <PrivateRoute path="/courses/create" component={createCourseWithContext} />
            <Route exact path="/courses/:id" component={CourseDetailWithContext} /> 
            <PrivateRoute path="/courses/:id/update/" component={updateCourseWithContext} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
