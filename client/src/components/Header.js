import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context }  from "../Context.js";

const Header = () => {
    // Declaring var for Context props
    const context = useContext(Context);
    // value props for authUser from Context
    const authUser = context.authenticatedUser;
    
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    {/* ternary validation that shows specific functions that depends 
                    of authentication */}
                    {authUser ?
                        <React.Fragment>
                            <ul className="header--signedout">
                                <li><span>Welcome, {authUser.firstName} {authUser.lastName}!</span></li>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </ul>
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