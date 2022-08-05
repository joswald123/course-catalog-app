import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Context   from "../Context";
// import { default as Data } from '../Data'


const CourseDetail = () => {

    const { id } = useParams();
    const context = useContext(Context.Context);
    const [course, setCourse] = useState([]);
    // const data = new Data();

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
    console.log(course);
    

    // delete function - btn
    function handleDeleteCourse () {
        fetch(`http://localhost:5000/api/courses/` + id, {
            method: 'DELETE',
            // headers: {
            //     'Content-Type': 'application/json',
            //     Authorization:
            //       'Basic ' +
            //       Buffer.from(
            //         `${authenticatedUser.emailAddress}:${authenticatedUser.password}`
            //       ).toString('base64'),
            //   },
            //   body: null,
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

    
    // link to {updateCourse} - (function update)

    // Auth practice.


    return(
        <div>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={'/updateCourse/' + course.id } >Update Course</Link>
                    <a className="button" onClick={handleDeleteCourse}>Delete Course</a>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{ course.title }</h4>
                            { course.user && 
                                    (<p>
                                        By {course.user.firstName} {course.user.lastName}
                                    </p>
                            )}
                            <p>{ course.description }</p>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{ course.estimatedTime }</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>{ course.materialsNeeded }</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CourseDetail;