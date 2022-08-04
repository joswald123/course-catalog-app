import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const UpdateCourse = () => {
  
    const { id } = useParams();
    const [course, setCourse] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/courses/${id}`)
        .then((res) => res.json())
        .then(data => {
          console.log(data);
          setCourse(data);
        })
        .catch((err) => console.log(err));
    }, []);
    

    // delete function - btn
    function handleUpdateCourse () {
        fetch(`http://localhost:5000/api/courses/` + id, {
            method: 'PUT',
        })
        .then( function() {
            alert("Course successfully updated!")
        })
        .catch(err => console.log(err))

    }

  return (
    <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={ course.title }
            />

            {course.user && (
              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>
            )}

            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription">
              { course.description } 
            </textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={ course.estimatedTime }
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded">
              { course.materialsNeeded }
            </textarea>
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
      </form>
    </div>
  );
};

export default UpdateCourse;
