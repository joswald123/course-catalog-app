import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";


const CourseDetail = () => {

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
    function handleDeleteCourse () {
        fetch(`http://localhost:5000/api/courses/` + id, {
            method: 'DELETE',
        })
        .then( function() {
            alert("Course successfully deleted!")
        })
        .catch(err => console.log(err))

    }
    
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