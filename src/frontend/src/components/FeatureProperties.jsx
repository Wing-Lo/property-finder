const FeatureProperties = () => {
    const properties = [
        {
            id: 1,
            title: "Beautiful Apartments",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
            image: "https://bulma.io/images/placeholders/1280x960.png",
            price: 120000,
            agent: {
                firstName: "John",
                lastName: "Smith",
            },
            address: "123 Happy Street",
            suburb: "Brisbane",
        },
        {
            id: 2,
            title: "Beautiful Apartments",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
            image: "https://bulma.io/images/placeholders/1280x960.png",
            price: 120000,
            agent: {
                firstName: "John",
                lastName: "Smith",
            },
            address: "123 Happy Street",
            suburb: "Brisbane",
        },
        {
            id: 3,
            title: "Beautiful Apartments",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
            image: "https://bulma.io/images/placeholders/1280x960.png",
            price: 120000,
            agent: {
                firstName: "John",
                lastName: "Smith",
            },
            address: "123 Happy Street",
            suburb: "Brisbane",
        },
        {
            id: 4,
            title: "Beautiful Apartments",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.",
            image: "https://bulma.io/images/placeholders/1280x960.png",
            price: 120000,
            agent: {
                firstName: "John",
                lastName: "Smith",
            },
            address: "123 Happy Street",
            suburb: "Brisbane",
        },
    ];

    return (
        <section className="section is-medium has-background-white">
            <h3 className="title is-3 has-text-primary">Feature Properties</h3>
            <div className="columns is-4 is-multiline">
                {properties.map((property) => {
                    return (
                        <div className="column is-one-third" key={property.id}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img
                                            src="https://bulma.io/assets/images/placeholders/1280x960.png"
                                            alt="Placeholder image"
                                        />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-5 mb-1 has-text-primary">
                                                {"$" + property.price}
                                            </p>
                                            <p className="subtitle is-6">
                                                {property.address +
                                                    ", " +
                                                    property.suburb}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="content">
                                        {property.description.substring(0, 50) +
                                            " ..."}
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a
                                        href="#"
                                        className="card-footer-item has-text-primary"
                                    >
                                        View more
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

export default FeatureProperties;
