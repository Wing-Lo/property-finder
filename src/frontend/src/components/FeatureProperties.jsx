/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_PROPERTY_IMAGE, API_URL } from "../../config";
import MoonLoader from "react-spinners/MoonLoader";

const FeatureProperties = ({
    isHome = false,
    sellOrRent,
    isMyProperties = false,
    isMyListings = false,
    loggedInUser,
}) => {
    const [allProperties, setAllProperties] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const override = {
        display: "block",
        margin: "0 auto",
    };

    useEffect(() => {
        if (isMyListings && !loggedInUser) return;

        // Fetch properties from an API
        const fetchProperties = async () => {
            try {
                const response = await fetch(API_URL + "properties");

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

                if (isMyListings) {
                    properties = properties.filter((property) => {
                        return property?.agent?._id === loggedInUser?.user?._id;
                    });
                }

                if (isMyProperties) {
                    properties = properties.filter((property) => {
                        console.log(loggedInUser);
                        return loggedInUser?.user?.savedProperties.includes(
                            property._id
                        );
                    });
                }

                setAllProperties(properties);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchProperties();
    }, [loggedInUser]);

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

    const deleteProperty = async (propertyId, loggedInUser) => {
        const token = loggedInUser?.token;
        try {
            const response = await fetch(
                `${API_URL}properties/delete/${propertyId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                toast.error("Unable to delete property, please try again!");
            } else {
                setAllProperties(
                    allProperties.filter(
                        (property) => property._id !== propertyId
                    )
                );
                toast.success("Property successfully deleted!");
            }
        } catch (err) {
            toast.error(err?.message || "Something went wrong!");
        }
    };

    const handleDelete = async (propertyId, loggedInUser) => {
        await deleteProperty(propertyId, loggedInUser);
    };

    if (isLoading) {
        return (
            <section className="section has-background-white">
                <MoonLoader
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Properties..."
                />
            </section>
        );
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
                                                alt="Property Image"
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
                                                <a
                                                    className="card-footer-item has-text-primary"
                                                    onClick={() => {
                                                        handleDelete(
                                                            property._id,
                                                            loggedInUser
                                                        );
                                                    }}
                                                >
                                                    Remove
                                                </a>
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
