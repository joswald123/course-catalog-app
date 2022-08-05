import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Context  from "../Context";
import Form from './Form';

const UpdateCourse = () => {
    const { authenticatedUser, data }  = useContext(Context);
    const { id } = useParams();
    
    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
    });

    useEffect(() => {
      fetch(`http://localhost:5000/api/courses/${id}`)
        .then((res) => res.json())
        .then(data => {
          console.log(data);
          setCourse(data);
        })
        .catch((err) => console.log(err));
    }, []);
    

    // Update function - btn
    function handleUpdateCourse (e) {
        e.preventDefault(e)
        // const body: JSON.stringify(
        //     {
        //       ...course 
        //     }
        // )
        fetch(`http://localhost:5000/api/courses/` + id, {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json',
            //     Authorization:
            //       'Basic ' +
            //       Buffer.from(
            //         `${authenticatedUser.emailAddress}:${authenticatedUser.password}`
            //       ).toString('base64'),
            //   },
                //body: body,
        }).then((response) => {
            if (response.status === 204) {
              alert('Course successfully delete!.');
            } else if (response.status === 400) {
              response.json().then((data) => {
                return data.errors;
              });
            } else {
              throw new Error();
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(e.target)
        setCourse(() => ({
            ...course, 
            [name]: value
        })) 
    }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <Form >
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
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
                name="courseDescription" 
                value={ course.description }
                onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
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
