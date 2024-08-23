/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FeatureProperties = ({
    isHome = false,
    sellOrRent,
    isMyProperties = false,
    isMyListings = false,
}) => {
    const [allProperties, setAllProperties] = useState();

    const DEFAULT_PROPERTY_IMAGE =
        "https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg";

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch properties from an API
        const fetchProperties = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/properties"
                );

                if (!response.ok) {
                    throw new Error("Unable to fetch properties!");
                }

                const data = await response.json();

                let properties = data;

                if (sellOrRent) {
                    properties = properties.filter((property) => {
                        return property?.sellOrRent === sellOrRent;
                    });
                }

                if (isHome) {
                    properties = properties.filter((property, index) => {
                        return index <= 2;
                    });
                }

                setAllProperties(properties);
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchProperties();
    }, []);

    let featurePropertyTitle;

    if (sellOrRent === "sell") {
        featurePropertyTitle = "Featured Properties For Sale";
    }

    if (sellOrRent === "rent") {
        featurePropertyTitle = "Featured Properties For Rent";
    }

    if (isMyProperties === true) {
        featurePropertyTitle = "My Saved Properties";
    }

    if (isMyListings === true) {
        featurePropertyTitle = "My Listings";
    }

    return (
        <section className="section has-background-white">
            <h3 className="title is-3 has-text-primary has-text-centered">
                {featurePropertyTitle}
            </h3>
            <div className="columns is-4 is-multiline">
                {allProperties &&
                    allProperties.map((property) => {
                        return (
                            <div
                                className="column is-one-third"
                                key={property._id}
                            >
                                <div className="card">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img
                                                src={
                                                    property.images[0] ||
                                                    DEFAULT_PROPERTY_IMAGE
                                                }
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
                                            {property.description.substring(
                                                0,
                                                50
                                            ) + " ..."}
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <Link
                                            to={`/property/${property._id}`}
                                            className="card-footer-item has-text-primary"
                                        >
                                            View More
                                        </Link>
                                        {isMyProperties && (
                                            <Link
                                                to={`/property/${property._id}`}
                                                className="card-footer-item has-text-primary"
                                            >
                                                Remove
                                            </Link>
                                        )}
                                        {isMyListings && (
                                            <>
                                                <Link
                                                    to={`/property/${property._id}`}
                                                    className="card-footer-item has-text-primary"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    to={`/property/${property._id}`}
                                                    className="card-footer-item has-text-primary"
                                                >
                                                    Remove
                                                </Link>
                                            </>
                                        )}
                                    </footer>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {isMyListings && (
                <button
                    onClick={() => navigate("/new-listing")}
                    className="button is-primary mr-3"
                >
                    Add New Listing
                </button>
            )}
        </section>
    );
};

export default FeatureProperties;
