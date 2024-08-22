import { useState, useEffect } from "react";

const Users = () => {
    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        // Fetch users from an API
        let users = [
            {
                id: 1,
                firstName: "John",
                lastName: "Smith",
                isAgent: true,
                profilePic:
                    "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=1024x1024&w=is&k=20&c=y4FFqpMLolCvEqoxlr4oypQqhAL1ta0ojXUnOofQXHk=",
                email: "john.smith@propertyfinder.com",
                mobileNumber: "0412 345 678",
            },
            {
                id: 2,
                firstName: "Jane",
                lastName: "Doe",
                isAgent: true,
                profilePic:
                    "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=1024x1024&w=is&k=20&c=y4FFqpMLolCvEqoxlr4oypQqhAL1ta0ojXUnOofQXHk=",
                email: "jane.doe@propertyfinder.com",
                mobileNumber: "0456 123 123",
            },
            {
                id: 3,
                firstName: "David",
                lastName: "Johnson",
                isAgent: false,
                profilePic:
                    "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=1024x1024&w=is&k=20&c=y4FFqpMLolCvEqoxlr4oypQqhAL1ta0ojXUnOofQXHk=",
                email: "david.johnson@propertyfinder.com",
                mobileNumber: "0478 987 654",
            },
        ];

        setAllUsers(users);
    }, []);

    return (
        <section className="section has-background-white">
            <h3 className="title is-3 has-text-primary has-text-centered">
                Our Agents
            </h3>
            <div className="columns is-4 is-multiline">
                {allUsers &&
                    allUsers.map((user) => {
                        return (
                            <div className="column is-one-third" key={user.id}>
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image is-4by4">
                                            <img
                                                src={user.profilePic}
                                                alt="Placeholder image"
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
                                    </footer>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default Users;
