import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MoonLoader from "react-spinners/MoonLoader";
import { API_URL, DEFAULT_PROPERTY_IMAGE } from "../../config";
import { formatToAUD } from "../utils";

const PropertyInfoPage = ({ loggedInUser, setLoggedInUser }) => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [savedProperties, setSavedProperties] = useState([]);

    const override = {
        display: "block",
        margin: "0 auto"
    };

    useEffect(() => {
        // Update savedProperties whenever loggedInUser changes
        if (loggedInUser) {
            setSavedProperties(loggedInUser.user.savedProperties || []);
        }
    }, [loggedInUser]);

    const handleSaveProperty = async () => {
        if (!loggedInUser) {
            toast.error("You must be logged in to save properties!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}users/addSavedProperty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedInUser.token}`
                },
                body: JSON.stringify({ propertyId })
            });

            if (!response.ok) {
                throw new Error("Failed to save property!");
            }

            const updatedUser = await response.json();
            setLoggedInUser({
                user: updatedUser.user,
                token: loggedInUser.token
            });

            setSavedProperties(updatedUser?.user?.savedProperties);
            toast.success("Property has been saved!");
        } catch (err) {
            toast.error(err.message || "Failed to save property!");
        }
    };

    const handleRemoveSavedProperty = async () => {
        if (!loggedInUser) {
            toast.error("You must be logged in to remove saved properties!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}users/removeSavedProperty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedInUser.token}`
                },
                body: JSON.stringify({ propertyId })
            });

            if (!response.ok) {
                throw new Error("Failed to remove saved property!");
            }

            const updatedUser = await response.json();
            setLoggedInUser({
                user: updatedUser.user,
                token: loggedInUser.token
            });
            setSavedProperties(updatedUser?.user?.savedProperties);
            toast.success("Saved property has been removed!");
        } catch (err) {
            toast.error(err.message || "Failed to remove saved property!");
        }
    };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`${API_URL}properties/${propertyId}`);

                if (!response.ok) {
                    throw new Error("Property not found!");
                }

                setProperty(await response.json());
            } catch (err) {
                toast.error(err.message || "Property not found!");
            }
        };

        fetchProperty();
        setIsLoading(false);
    }, []);

    const propertyStatusLabel = property?.sellOrRent === "sell" ? "For Sale" : "For Rent";

    if (isLoading) {
        return (
            <section className="section has-background-white">
                <MoonLoader cssOverride={override} size={150} aria-label="Loading Property..." />
            </section>
        );
    }

    return (
        <section className="section has-background-white">
            <h3 className="title is-3 has-text-primary has-text-centered">Property Info</h3>
            {property ? (
                <div className="columns mt-4">
                    <div className="column pt-6 pl-6 is-two-fifths">
                        <h4 className="title is-4 has-text-dark">{property.address}</h4>
                        <h4 className="subtitle is-4 has-text-grey">{property.suburb}</h4>
                        <h6 className="title is-6 has-text-dark mt-4">{propertyStatusLabel}</h6>
                        <h6 className="subtitle is-5 mt-4">
                            {formatToAUD(property.price)}
                            {property?.sellOrRent === "rent" && " Per Week"}
                        </h6>
                        <p>{property.description}</p>
                        <h6 className="title is-6 has-text-dark mt-4">Agent</h6>
                        <h6 className="subtitle is-6 mt-1">
                            {property.agent.firstName +
                                " " +
                                property.agent.lastName +
                                " " +
                                property.agent.mobileNumber}
                        </h6>
                        <div>
                            {loggedInUser &&
                                (savedProperties.includes(propertyId) ? (
                                    <button
                                        className="button is-primary mr-3"
                                        onClick={() => {
                                            handleRemoveSavedProperty();
                                        }}>
                                        Unsave Property
                                    </button>
                                ) : (
                                    <button
                                        className="button is-primary mr-3"
                                        onClick={() => {
                                            handleSaveProperty();
                                        }}>
                                        Save Property
                                    </button>
                                ))}

                            <button
                                onClick={(e) => {
                                    window.location.href = "mailto:" + property.agent.email;
                                    e.preventDefault();
                                }}
                                className="button is-secondary">
                                Contact Agent
                            </button>
                        </div>
                    </div>
                    <div className="column">
                        <figure className="image is-4by3">
                            <img src={property.images[0] || DEFAULT_PROPERTY_IMAGE} alt="Property Image" />
                        </figure>
                    </div>
                </div>
            ) : (
                <div>
                    <h5 className="title is-5 has-text-dark">Property is not found.</h5>
                </div>
            )}
        </section>
    );
};

export default PropertyInfoPage;
