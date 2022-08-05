import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context }  from "../Context";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const context = useContext(Context);
    
  useEffect(() => {
    context.data.getCourses()
    .then((courses) => {
        if(courses) {
            setCourses(courses)
        } else {
            console.log("Error");
        }
    })
  }, []);
  

  return (
    <div className="wrap main--grid">   
        { courses.map( course => (
            <Link className="course--module course--link" key={course.id} to={`/courses/${course.id}`}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title" key={ course.id }>{ course.title }</h3>
            </Link>
        ))}
      
      <a className="course--module course--add--module" href="create-course.html">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </a>
    </div>
  );
};

export default Courses;
