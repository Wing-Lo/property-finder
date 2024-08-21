import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

    const navigate = useNavigate();

    return (
        <nav
            className="navbar is-dark"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item" onClick={() => navigate("/")}>
                    <h4 className="title is-4 has-text-primary pl-4">
                        PROPERTY FINDER
                    </h4>
                </a>

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={() => setIsMobileMenuOpened(!isMobileMenuOpened)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div
                id="navbarBasicExample"
                className={
                    isMobileMenuOpened ? "navbar-menu is-active" : "navbar-menu"
                }
            >
                <div className="navbar-start">
                    <NavLink to="/" className="navbar-item">
                        HOME
                    </NavLink>
                    <NavLink to="/buy" className="navbar-item">
                        BUY
                    </NavLink>
                    <NavLink to="/rent" className="navbar-item">
                        RENT
                    </NavLink>
                    <NavLink to="/agent" className="navbar-item">
                        AGENT
                    </NavLink>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <NavLink to="/my-properties" className="navbar-item">
                            MY PROPERTIES
                        </NavLink>
                        <NavLink to="/my-listings" className="navbar-item">
                            MY LISTINGS
                        </NavLink>
                        <div className="buttons">
                            <a
                                className="button is-primary"
                                onClick={() => navigate("/register")}
                            >
                                <strong>Sign up</strong>
                            </a>
                            <a
                                className="button is-secondary"
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
