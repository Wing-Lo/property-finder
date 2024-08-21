import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyInfoPage = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        // Fetch properties from an API
        let properties = [
            {
                id: 1,
                title: "Rental Apartments",
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
                sellOrRent: "rent",
            },
            {
                id: 2,
                title: "Rental Apartments",
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
                sellOrRent: "rent",
            },
            {
                id: 3,
                title: "Rental Apartments",
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
                sellOrRent: "rent",
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
                sellOrRent: "sell",
            },
            {
                id: 5,
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
                sellOrRent: "sell",
            },
            {
                id: 6,
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
                sellOrRent: "sell",
            },
        ];

        const foundProperty = properties.find(
            (property) => property.id === parseInt(propertyId)
        );

        setProperty(foundProperty);
    }, []);

    const propertyStatusLabel =
        property?.sellOrRent === "sell" ? "For Sale" : "For Rent";

    return (
        <section className="section has-background-white">
            <h3 className="title is-3 has-text-primary has-text-centered">
                Property Info
            </h3>
            {property ? (
                <div className="columns mt-4">
                    <div className="column pt-6 pl-6">
                        <h4 className="title is-4 has-text-dark">
                            {property.address}
                        </h4>
                        <h4 className="subtitle is-4 has-text-grey">
                            {property.suburb}
                        </h4>
                        <h6 className="title is-6 has-text-dark mt-4">
                            {propertyStatusLabel}
                        </h6>
                        <h6 className="subtitle is-6">
                            {"$" + property.price}
                        </h6>
                        <p>{property.description}</p>
                        <h6 className="title is-6 has-text-dark mt-4">Agent</h6>
                        <h6 className="subtitle is-6 mt-1">
                            {property.agent.firstName +
                                " " +
                                property.agent.lastName +
                                " 0400 000 000"}
                        </h6>
                        <div>
                            <button className="button is-primary mr-3">
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
            ) : (
                <div>
                    <h5 className="title is-5 has-text-dark">
                        Property is not found.
                    </h5>
                </div>
            )}
        </section>
    );
};

export default PropertyInfoPage;
