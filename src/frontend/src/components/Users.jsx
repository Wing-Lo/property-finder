import { useState, useEffect } from "react";

const Users = ({ isAgentPage = false }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const DEFAULT_PROFILE_PIC =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz68b1g8MSxSUqvFtuo44MvagkdFGoG7Z7DQ&s";

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/users/"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();

                let users = data;
                if (isAgentPage) {
                    users = users.filter((user) => user.isAgent === true);
                }

                setAllUsers(users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [isAgentPage]);

    let userTitle;
    if (isAgentPage) {
        userTitle = "Our Agents";
    } else {
        userTitle = "Manage Users";
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="section has-background-white">
            <h3 className="title is-3 has-text-primary has-text-centered">
                {userTitle}
            </h3>
            <div className="columns is-4 is-multiline">
                {allUsers.map((user) => (
                    <div className="column is-one-third" key={user.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img
                                        src={
                                            user.profilePic ||
                                            DEFAULT_PROFILE_PIC
                                        }
                                        alt="User profile"
                                    />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <h5 className="title is-5 mb-1 has-text-primary">
                                            {user.firstName +
                                                " " +
                                                user.lastName}
                                        </h5>
                                        <div className="content">
                                            <h6 className="title is-5 has-text-secondary mt-2">
                                                {user.mobileNumber}
                                            </h6>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="card-footer">
                                {isAgentPage && (
                                    <a
                                        onClick={(e) => {
                                            window.location.href =
                                                "mailto:no-reply@propertyfinder.com";
                                            e.preventDefault();
                                        }}
                                        className="card-footer-item has-text-primary"
                                    >
                                        Contact Agent
                                    </a>
                                )}
                                {!isAgentPage && (
                                    <>
                                        {user.isAgent ? (
                                            <a className="card-footer-item has-text-primary">
                                                Remove Agent
                                            </a>
                                        ) : (
                                            <a className="card-footer-item has-text-primary">
                                                Make Agent
                                            </a>
                                        )}
                                        <a className="card-footer-item has-text-primary">
                                            Edit
                                        </a>
                                        <a className="card-footer-item has-text-primary">
                                            Delete
                                        </a>
                                    </>
                                )}
                            </footer>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Users;
