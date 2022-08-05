import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context   from "../Context.js";

const Header = () => {
    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;
    // console.log(context);
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {authUser ?
                        <React.Fragment>
                        <span>Welcome, {authUser.name}!</span>
                        <Link to="/signout">Sign Out</Link>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <Link className="signup" to="/signup">Sign Up</Link>
                            <Link className="signin" to="/signin">Sign In</Link>
                        </React.Fragment>
                    }
                    
                </nav>
            </div>
        </header>
    )
}

export default Header;