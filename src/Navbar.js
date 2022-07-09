import React,{useContext} from 'react';
import { Link, NavLink } from "react-router-dom";
import { AppContext } from './App';
import {useNavigate} from "react-router-dom";

function Navbar() {
    const appContext=useContext(AppContext);
    const {isLogged,removeCookie,setIsLogged}=appContext
    const navigate = useNavigate();

    const toggleHandler = () => {
        let items = document.querySelector(".my-nav-toggle");
        items.classList.toggle("toggle-visibility")
    }

    const logoutHandle=()=>{
        console.log("working");
        removeCookie('token', { path: '/' });
        setIsLogged(false);
        navigate('/');
    }

    return (
        <div>
            <div id="my-navbar">
                <div className="toggle-visible">
                    <div className="my-brand-logo">
                        <NavLink className="my-navbar-brand" to="/">
                            <img src="/images/bloggerLogo3.png " alt="" />
                        </NavLink>
                    </div>
                    <button className="my-toggle-button" onClick={() => { toggleHandler() }}>
               
                        <i className="fa fa-align-right" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="my-nav-toggle">
                    <div className="my-nav-items">
                        <div className="my-nav-item">
                            {/* <form tabIndex="1" action="" className="my-form">
                                <label htmlFor="search">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </label>
                                <input type="search" name="search" placeholder="search" id="search" />
                            </form> */}
                        </div>
                    </div>
                    <div className="my-nav-items my-nav-right">
                        <div className="my-nav-item">
                            <NavLink className={(navData) => (navData.isActive ? "active-main-route" : 'main-route-link')} to="/" >Home</NavLink>

                        </div>

                        {isLogged &&
                            <div className="my-nav-item">
                                <NavLink className={(navData) => (navData.isActive ? "active-main-route" : 'main-route-link')} to="/createblog">Create Blog</NavLink>

                            </div>
                        }
                       



                        {!isLogged && 
                            <div className="my-nav-item">
                                <NavLink className={(navData) => (navData.isActive ? "active-main-route" : 'main-route-link')} to="/login">Login</NavLink>
                            </div>
                        }
                        {!isLogged &&
                            <div className="my-nav-item">
                            <NavLink className={(navData) => (navData.isActive ? "active-main-route" : 'main-route-link')} to="/signup">Sign Up</NavLink>

                            </div>
                        }
                        {isLogged &&

                            <div className="my-nav-item">
                                <NavLink className={(navData) => (navData.isActive ? "active-main-route" : 'main-route-link')} to="/profile">Profile</NavLink>
                            </div>
                        }
                        {isLogged &&

                            <div className="my-nav-item">
                                <button className= 'main-route-link' onClick={logoutHandle}>Logout</button>
                            </div>
                        }
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Navbar
