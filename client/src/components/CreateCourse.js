import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context }  from "../Context";
import Form from './Form';

const CreateCourse = () => {
  // Declaring Context Variable
  const  context  = useContext(Context);
  // Authenticated user from Context
  const authUser = context.authenticatedUser;
  // useHistory Hook
  let history = useHistory();
  // useState Hook for Errors - Empty array
  const [ errors, setErrors ] = useState([]); 

  // Function that redirects to home page
  const cancel = () => {
    history.push('/');
  }

  // Create a new course function
  const submit = (e) => {
    // Destructuring authUser Object
    const { emailAddress, password, id } = authUser

    // create a new course payload
    const course = {
        title: e.target[0].value,
        description: e.target[1].value,
        estimatedTime: e.target[2].value,
        materialsNeeded: e.target[3].value,
        userId: id,
    
    };
    // Create a new course Consuming API from Data.js method 'POST'
    context.data.createCourse( course, {emailAddress, password})
        .then(errors => {
            if (errors.length) {
                setErrors(errors);    
            } else {
                history.push('/');
                console.log('SUCCESS! Your Course was created!');
            }
        })
        .catch( err => {
          console.log(err);
          history.push('/error'); // push to history stack       
        }) 
}

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Create Course"
        elements={() => ( // render prop
            <React.Fragment>
            <div className="main--flex">
            <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue= ""
                />

                {authUser && (
                <p>
                    By {authUser.firstName} {authUser.lastName}
                </p>
                )}

                <label htmlFor="courseDescription">Course Description</label>
                <textarea 
                    id="courseDescription" 
                    name="courseDescription" 
                    defaultValue= ""
                />
            </div>
            <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                defaultValue= ""

                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded"
                    defaultValue= ""

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

export default CreateCourse;
