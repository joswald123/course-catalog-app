import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Context }  from "../Context";
import Form from './Form';


const UpdateCourse = () => {
  // Declaring Context Variable
  const  context  = useContext(Context);
  // Id course params  
  const { id } = useParams();
  // Authenticated user from Context
  const authUser = context.authenticatedUser;
  // useHistory Hook
  let history = useHistory();
  
  // Initial state for errors
  const [ errors, setErrors ] = useState([]);
  // Initial state for course
  const [course, setCourse] = useState({
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
  });

  // Fetch API call from Data.js using Context
  useEffect(() => {
    context.data.getCourse(id)
      .then((course) => {
        if(course) {
            setCourse(course)
        } else {
            console.log("Error");
        }
    })
  }, []);

  // Function for change events
  const handleChange = (e) => {
      const { name, value } = e.target
      
      setCourse(() => ({
          ...course, 
          [name]: value
      })) 
  }

  // Function that redirects to home page
  const cancel = () => {
    history.push('/');
  }

  // Update a existing course api request
  const submit = (e) => {
    const { emailAddress, password } = authUser;

  
    // Update a course payload
    const course = {
      title: e.target[0].value,
      description: e.target[1].value,
      estimatedTime: e.target[2].value,
      materialsNeeded: e.target[3].value,
    };

    // Consuming API from server method 'PUT'
    context.data.updateCourse(id, course, {emailAddress, password})
      .then(errors => {
          if(errors.length) {
            setErrors(errors)

          } else {
              history.push('/');
              // console.log('SUCCESS! Your Course was Update!');
          }
      })
      .catch( err => {
          console.log(err);
          history.push('/error');
      }) 
}

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <Form
      cancel={cancel}
      errors={errors}
      submit={submit}
      submitButtonText="Update"
      elements={() => ( // render prop
        <React.Fragment>
          <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="title"
              value={ course.title }
              onChange={handleChange}
          
            />

            {course.user && (
              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>
            )}

            <label htmlFor="courseDescription">Course Description</label>
            <textarea 
              id="courseDescription" 
              name="description" 
              value={ course.description }
              onChange={handleChange}
            
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              value={ course.estimatedTime }
              onChange={handleChange}
          
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea 
              id="materialsNeeded" 
              name="materialsNeeded"
              value={ course.materialsNeeded }
              onChange={handleChange}
            
            />
          </div>
        </div>

        </React.Fragment>
      
      )}>
        
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
        //   onClick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </Form>
    </div>
  );
};

export default UpdateCourse;
