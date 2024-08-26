/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const LoginPage = ({ loggedInUser, setLoggedInUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRememberLogin, setIsRememberLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
        return errors;
    };

    const userLogin = async (credentials) => {
        try {
            const response = await fetch(API_URL + "users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            setLoggedInUser(data);

            if (isRememberLogin) {
                localStorage.setItem("loggedInUser", JSON.stringify(data));
            } else {
                sessionStorage.setItem("loggedInUser", JSON.stringify(data));
            }
        } catch (err) {
            throw new Error(err.message || "An unexpected error occurred");
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        try {
            await userLogin({ email, password });
            toast.success("Successfully logged in");
            navigate("/");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="hero is-dark is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <h4 className="title is-4 has-text-centered">Sign in</h4>
                            <form onSubmit={handleLogin} className="box">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="email"
                                            placeholder="e.g. bobsmith@gmail.com"
                                            className={`input ${errors.email ? "is-danger" : ""}`}
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                    {errors.email && <p className="help is-danger">{errors.email}</p>}
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="password"
                                            placeholder="*******"
                                            className={`input ${errors.password ? "is-danger" : ""}`}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                    {errors.password && <p className="help is-danger">{errors.password}</p>}
                                </div>
                                <div className="field">
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            checked={isRememberLogin}
                                            onChange={(event) => setIsRememberLogin(event.target.checked)}
                                        />
                                        <span className="ml-2">Remember me</span>
                                    </label>
                                </div>
                                <div className="field">
                                    <button type="submit" className="button is-primary" disabled={isLoading}>
                                        {isLoading ? "Logging in..." : "Login"}
                                    </button>
                                </div>
                            </form>
                            <p className="has-text-centered">
                                Don't have an account?
                                <a href="/register" className="has-text-light has-text-weight-semibold">
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
