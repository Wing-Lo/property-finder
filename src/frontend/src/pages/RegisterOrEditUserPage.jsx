/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { handleFileUpload } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

const RegisterOrEditUserPage = ({ isEditUserMode = false, loggedInUser }) => {
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [existingProfilePic, setExistingProfilePic] = useState(""); // For existing profile picture
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { userId } = useParams(); // Assuming userId is passed via URL parameters

    // Validation Function
    const isValidForm = () => {
        if (!email || !mobileNumber || !firstName || !lastName) {
            toast.error("All fields are required.");
            return false;
        }
        if (isEditUserMode && (password || retypePassword)) {
            if (password !== retypePassword) {
                toast.error("Passwords do not match.");
                return false;
            }
        }
        if (!isEditUserMode && (!password || !retypePassword)) {
            toast.error("Password fields are required.");
            return false;
        }
        if (profilePic === null && !isEditUserMode) {
            toast.error("Profile picture is required.");
            return false;
        }
        return true;
    };

    // Function to Handle User Registration
    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    mobileNumber,
                    firstName,
                    lastName,
                    password,
                    profilePic
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || "Registration failed");
            }
            toast.success("Successfully registered!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    // Function to Handle User Update
    const handleUpdate = async () => {
        setIsLoading(true);
        const token = loggedInUser?.token;
        try {
            const response = await fetch(`${API_URL}users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    email,
                    mobileNumber,
                    firstName,
                    lastName,
                    password,
                    profilePic: profilePic || existingProfilePic // Use new image if uploaded, otherwise existing image
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || "Update failed");
            }
            toast.success("User updated successfully!");
            navigate("/manage-user");
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isValidForm()) {
            if (isEditUserMode) {
                await handleUpdate();
            } else {
                await handleRegister();
            }
        }
    };

    // Fetch User Data for Editing
    useEffect(() => {
        if (isEditUserMode && userId) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${API_URL}users/${userId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
                    const data = await response.json();
                    setEmail(data.email);
                    setMobileNumber(data.mobileNumber);
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setExistingProfilePic(data.profilePic || ""); // Set existing profile picture URL
                } catch (error) {
                    toast.error(error.message || "An unexpected error occurred");
                }
            };
            fetchUserData();
        }
    }, [isEditUserMode, userId]);

    return (
        <section className="hero is-dark is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h4 className="title is-4">{isEditUserMode ? "Edit User" : "Sign Up"}</h4>
                    <h6 className="subtitle is-6 mt-2">{isEditUserMode ? "Update Your Details" : "With Your Email"}</h6>
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
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                        />
                                        <span className="icon is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label" htmlFor="mobileNumber">
                                        Mobile Number
                                    </label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="tel"
                                            placeholder="Mobile Number"
                                            name="mobileNumber"
                                            value={mobileNumber}
                                            onChange={(event) => setMobileNumber(event.target.value)}
                                            required
                                        />
                                        <span className="icon is-left">
                                            <i className="fa fa-mobile"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="columns row-one">
                                <div className="column">
                                    <label className="label mt-2" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label mt-2" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Last Name"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(event) => setLastName(event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {!isEditUserMode && (
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
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                required={!isEditUserMode}
                                            />
                                            <span className="icon is-left">
                                                <i className="fa fa-key"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <label className="label" htmlFor="retypePassword">
                                            Re-Type Password
                                        </label>
                                        <div className="control has-icons-left">
                                            <input
                                                className="input"
                                                type="password"
                                                placeholder="Confirm Password"
                                                name="retypePassword"
                                                value={retypePassword}
                                                onChange={(event) => setRetypePassword(event.target.value)}
                                            />
                                            <span className="icon is-left">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="field">
                                <div className="mt-2">
                                    {profilePic && !isEditUserMode && (
                                        <img
                                            src={profilePic}
                                            alt="Profile Preview"
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                    )}
                                    {isEditUserMode && (
                                        <>
                                            <img
                                                src={existingProfilePic || profilePic}
                                                alt="Profile Preview"
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                            {!profilePic && existingProfilePic && (
                                                <img
                                                    src={existingProfilePic}
                                                    alt="Existing Profile"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>

                                <div>
                                    <label className="file-label">
                                        <input
                                            className="file-input"
                                            type="file"
                                            name="profilePic"
                                            accept=".jpeg, .png, .jpg"
                                            onChange={(e) => handleFileUpload(e, setProfilePic)}
                                        />
                                        <span className="file-cta mt-2">
                                            <span className="file-icon">
                                                <i className="fa fa-upload"></i>
                                            </span>
                                            <span className="file-label">Upload Image</span>
                                        </span>
                                    </label>
                                    {profilePic && (
                                        <div className="icon-text mt-2">
                                            <span className="icon has-text-success">
                                                <i className="fas fa-check"></i>
                                            </span>
                                            <span>New profile picture Is successfully uploaded</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="control mt-2">
                                <button className="button is-primary mt-4" type="submit" disabled={isLoading}>
                                    {isLoading
                                        ? isEditUserMode
                                            ? "Updating..."
                                            : "Registering..."
                                        : isEditUserMode
                                        ? "Update"
                                        : "Register"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegisterOrEditUserPage;
