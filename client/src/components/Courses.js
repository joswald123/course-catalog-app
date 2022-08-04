import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses`)
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        setCourses(data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  console.log(courses);

  return (
    <div className="wrap main--grid">   
        { courses.map( course => {
            <Link className="course--module course--link" to={`/courses/${course.id}`}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title" key={ course.id }>{ course.title }</h3>;
            </Link>
        })}
      
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
