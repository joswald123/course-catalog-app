import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Context } from "../Context";

const CourseDetail = () => {
  // Id course params  
  const { id } = useParams();
  // Declaring Context Variable
  const context = useContext(Context);
  // Authenticated user from Context
  const authUser = context.authenticatedUser;
  // useHistory Hook
  let history = useHistory();
  // Initial state for a Course
  const [course, setCourse] = useState([]);

  // Fetch API call from Data.js using Context
  useEffect(() => {
    context.data.getCourse(id).then((course) => {
      if (course) {
        setCourse(course);
      } else {
        console.log("Error");
      }
    });
  }, [id, context]);

  // delete function - btn
  function handleDeleteCourse() {
    const { emailAddress, password } = authUser;
    // Consuming API method 'DELETE' from the server through Data.js
    context.data
      .deleteCourse(id, { emailAddress, password })
      .then(errors => {
        if (errors.length) {
          console.log("Access Denied. Please signIn with your account!");
        } else {
          history.push("/");
          // console.log("SUCCESS! Your Course was removed");
        }
      })
      .catch((err) => {
        // console.log(err);
        history.push("/error");
      });
  }
  

  return (
    <div>
      <div className="actions--bar">
        <div className="wrap">
            { authUser && authUser.id === course.userId ?
                <React.Fragment>
                    <Link className="button" to={`${course.id}/update`  } >Update Course</Link>
                    <button className="button" href="#" onClick={handleDeleteCourse}>Delete Course</button>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </React.Fragment>
            :
                <Link className="button button-secondary" to="/">Return to List</Link>

            }
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              {course.user && (
                <p>
                  By {course.user.firstName} {course.user.lastName}
                </p>
              )}
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseDetail;
