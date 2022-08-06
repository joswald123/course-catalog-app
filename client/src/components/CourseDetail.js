import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context }   from "../Context";


const CourseDetail = () => {

    const { id } = useParams();
    const context = useContext(Context);
    let history = useHistory();
    const [course, setCourse] = useState([]);

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

    // delete function - btn
    function handleDeleteCourse() {
        const authUser = context.authenticatedUser;
        const { emailAddress, password } = authUser
        console.log(emailAddress, password);

        context.data.deleteCourse(id, {emailAddress, password})
        .then(emailAddress => {
            if(emailAddress === null) {
                console.log('Access Denied. Please signIn with your account!');
    
            } else {
                history.push('/');
                console.log('SUCCESS! Your Course was removed');
            }
        })
        .catch( err => {
            console.log(err);
            history.push('/error');
        })
    }


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