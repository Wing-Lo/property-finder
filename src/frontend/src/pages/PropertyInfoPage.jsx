const PropertyInfoPage = () => {
    return (
        <section className="section has-background-white">
            <h3 className="title is-3 has-text-primary has-text-centered">
                Property Info
            </h3>
            <div className="columns">
                <div className="column pt-6 pl-6">
                    <h4 className="title is-4 has-text-dark">
                        123 Happy Street
                    </h4>
                    <h4 className="subtitle is-4 has-text-grey">Brisbane</h4>
                    <h6 className="title is-6 has-text-dark mt-2">For Sale</h6>
                    <h6 className="subtitle is-6">$120,000</h6>
                    <p>This is a paragraph.</p>
                    <h6 className="title is-6 has-text-dark mt-4">Agent</h6>
                    <h6 className="subtitle is-6">John Smith 0411 000 000</h6>
                    <div>
                        <button
                            className="button is-primary mr-3"
                        >
                            Save Property
                        </button>

                        <button
                            onClick={(e) => {
                                window.location.href =
                                    "mailto:no-reply@propertyfinder.com";
                                e.preventDefault();
                            }}
                            className="button is-secondary"
                        >
                            Contact Agent
                        </button>
                    </div>
                </div>
                <div className="column">
                    <figure className="image is-4by3">
                        <img
                            src="https://bulma.io/assets/images/placeholders/1280x960.png"
                            alt="Placeholder image"
                        />
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default PropertyInfoPage;
