import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context }  from "../Context.js";

const Header = () => {
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    
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
                            <ul className="header--signedout">
                                <li><Link className="signup" to="/signup">Sign Up</Link></li>
                                <li><Link className="signin" to="/signin">Sign In</Link></li>
                            </ul>
                        </React.Fragment>
                    }
                    
                </nav>
            </div>
        </header>
    )
}

export default Header;