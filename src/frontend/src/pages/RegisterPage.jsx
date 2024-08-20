const RegisterPage = () => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <h4 className="title is-4">Sign Up</h4>
                    <h6 className="subtitle is-6 mt-2">With Your Email</h6>
                    <form id="register-form">
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
                                        />
                                        <span className="icon is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button
                                        className="button is-primary mt-4"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
