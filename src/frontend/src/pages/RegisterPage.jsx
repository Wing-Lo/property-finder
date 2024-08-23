import { useState } from "react";
import { handleFileUpload } from "../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const [email, setEmail] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [retypePassword, setRetypePassword] = useState();
    const [profilePic, setProfilePic] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = async () => {
        return await fetch("http://localhost:4000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                mobileNumber,
                firstName,
                lastName,
                password,
                profilePic,
            }),
        })
            .then(() => {
                setIsLoading(false);
                toast.success("Successfully registered!");
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error?.errorMessage);
            });
    };

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        try {
            await registerUser();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="hero is-dark is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h4 className="title is-4">Sign Up</h4>
                    <h6 className="subtitle is-6 mt-2">With Your Email</h6>
                    <form id="register-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="columns">
                                <div className="column">
                                    <label className="label" htmlFor="email">
                                        Email
                                    </label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            required
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                        />
                                        <span className="icon is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="column">
                                    <label
                                        className="label"
                                        htmlFor="mobileNumber"
                                    >
                                        Mobile Number
                                    </label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="tel"
                                            placeholder="Mobile Number"
                                            name="mobileNumber"
                                            required
                                            onChange={(event) => {
                                                setMobileNumber(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        <span className="icon is-left">
                                            <i className="fa fa-mobile"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="columns row-one">
                                <div className="column">
                                    <label
                                        className="label mt-2"
                                        htmlFor="firstName"
                                    >
                                        First Name
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            required
                                            onChange={(event) => {
                                                setFirstName(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="column">
                                    <label
                                        className="label mt-2"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            required
                                            onChange={(event) => {
                                                setLastName(event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            required
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                        />
                                        <span className="icon is-left">
                                            <i className="fa fa-key"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="column">
                                    <label
                                        className="label"
                                        htmlFor="retypePassword"
                                    >
                                        Re-Type Password
                                    </label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="retypePassword"
                                            required
                                            onChange={(event) => {
                                                setRetypePassword(
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        <span className="icon is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="file-label">
                                    <input
                                        className="file-input"
                                        type="file"
                                        name="propertyImage"
                                        accept=".jpeg, .png, .jpg"
                                        required
                                        onChange={(e) => {
                                            handleFileUpload(e, setProfilePic);
                                        }}
                                    />
                                    <span className="file-cta mt-2">
                                        <span className="file-icon">
                                            <i className="fa fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Upload Image
                                        </span>
                                    </span>
                                </label>
                            </div>
                            {profilePic && (
                                <div className="icon-text mt-5">
                                    <span className="icon has-text-success">
                                        <i className="fas fa-check"></i>
                                    </span>
                                    <span>Image Successfully uploaded</span>
                                </div>
                            )}
                            <div className="control mt-2">
                                <button
                                    className="button is-primary mt-4"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
