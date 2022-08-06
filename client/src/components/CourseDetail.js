import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Context } from "../Context";

const CourseDetail = () => {
  const { id } = useParams();
  const context = useContext(Context);
  const authUser = context.authenticatedUser;
  let history = useHistory();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    context.data.getCourse(id).then((course) => {
      if (course) {
        setCourse(course);
      } else {
        console.log("Error");
      }
    });
  }, []);

  // delete function - btn
  function handleDeleteCourse() {
    const { emailAddress, password } = authUser;

    context.data
      .deleteCourse(id, { emailAddress, password })
      .then(errors => {
        if (errors.length) {
          console.log("Access Denied. Please signIn with your account!");
        } else {
          history.push("/");
          console.log("SUCCESS! Your Course was removed");
        }
      })
      .catch((err) => {
        console.log(err);
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
                    <a className="button" onClick={handleDeleteCourse}>Delete Course</a>
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
