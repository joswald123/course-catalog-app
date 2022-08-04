import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';


import Courses from './components/Courses';
import Layout from './components/Layout';

import withContext from "./Context";

const CoursesWithContext = withContext(Courses);

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CoursesWithContext />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
