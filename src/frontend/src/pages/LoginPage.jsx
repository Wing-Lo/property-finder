/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ loggedInUser, setLoggedInUser }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isRememberLogin, setIsRememberLogin] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const userLogin = async (credentials) => {
        return await fetch("http://localhost:4000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then((data) => data.json())
            .then((data) => {
                setLoggedInUser(data);

                if (isRememberLogin) {
                    localStorage.setItem("loggedInUser", JSON.stringify(data));
                } else {
                    sessionStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(data)
                    );
                }
                setIsLoading(false);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleLogin = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        try {
            await userLogin({ email: email, password: password });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="hero is-dark is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <h4 className="title is-4 has-text-centered">
                                Sign in
                            </h4>
                            <form onSubmit={handleLogin} className="box">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="email"
                                            placeholder="e.g. bobsmith@gmail.com"
                                            className="input"
                                            required
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="password"
                                            placeholder="*******"
                                            className="input"
                                            required
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            onChange={(event) => {
                                                setIsRememberLogin(
                                                    event.target.checked
                                                );
                                            }}
                                        />
                                        <span className="ml-2">
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div className="field">
                                    <button
                                        type="submit "
                                        className="button is-primary"
                                        disabled={isLoading}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <p className="has-text-centered">
                                Don't have an account?
                                <a
                                    href="/register"
                                    className="has-text-light has-text-weight-semibold"
                                >
                                    {" "}
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
