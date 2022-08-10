import React from "react";
import { Link } from "react-router-dom";
// NotFound route component
const NotFound = () => {
    
    return(
        <div className="wrap">
            <h2>Not Found</h2> 
            <p>Sorry! We couldn't find the page you're looking for.</p>

            <Link className="button button-secondary" to="/">Return to home</Link>
        </div>
    )
    
}

export default NotFound;