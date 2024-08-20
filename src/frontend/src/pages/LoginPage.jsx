const LoginPage = () => {
    return (
        <section className="hero is-dark is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            <h4 className="title is-4 has-text-centered">
                                Sign in
                            </h4>
                            <form action="" className="box">
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="email"
                                            placeholder="e.g. bobsmith@gmail.com"
                                            className="input"
                                            required
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
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-lock"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        <span className="ml-2">
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div className="field">
                                    <button className="button is-primary">
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
