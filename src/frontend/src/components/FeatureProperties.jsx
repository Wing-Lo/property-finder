/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DEFAULT_PROPERTY_IMAGE, API_URL } from "../../config";
import MoonLoader from "react-spinners/MoonLoader";
import { formatToAUD } from "../utils";
import { debounce } from "../utils"; // Import the debounce function

const FeatureProperties = ({
    isHome = false,
    sellOrRent,
    isMyProperties = false,
    isMyListings = false,
    loggedInUser
}) => {
    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [propertyType, setPropertyType] = useState("all");
    const [priceRange, setPriceRange] = useState("all");
    const navigate = useNavigate();
    const override = {
        display: "block",
        margin: "0 auto"
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
                    properties = properties.filter((property) => property?.sellOrRent === sellOrRent);
                }

                if (isHome) {
                    properties = properties.filter((property, index) => index <= 2);
                }

                if (isMyListings) {
                    properties = properties.filter((property) => property?.agent?._id === loggedInUser?.user?._id);
                }

                if (isMyProperties) {
                    properties = properties.filter((property) =>
                        loggedInUser?.user?.savedProperties.includes(property._id)
                    );
                }

                setAllProperties(properties);
                setFilteredProperties(properties);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchProperties();
    }, [loggedInUser, sellOrRent, isHome, isMyListings, isMyProperties]);

    // Debounced search handler
    const debouncedSearch = useCallback(
        debounce(() => {
            let filtered = allProperties;

            if (searchQuery) {
                filtered = filtered.filter(
                    (property) =>
                        property.address.toLowerCase().includes(searchQuery) ||
                        property.suburb.toLowerCase().includes(searchQuery) ||
                        property.description.toLowerCase().includes(searchQuery)
                );
            }

            if (propertyType !== "all") {
                filtered = filtered.filter((property) => property.sellOrRent === propertyType);
            }

            if (priceRange !== "all") {
                const [minPrice, maxPrice] = priceRange.split("-").map(Number);
                filtered = filtered.filter((property) => {
                    const price = property.price;
                    return price >= minPrice && (maxPrice ? price <= maxPrice : true);
                });
            }

            setFilteredProperties(filtered);
        }, 300), // Adjust debounce delay as needed
        [allProperties, searchQuery, propertyType, priceRange]
    );

    useEffect(() => {
        debouncedSearch();
    }, [searchQuery, propertyType, priceRange, debouncedSearch]);

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Handle property type change
    const handlePropertyTypeChange = (event) => {
        setPropertyType(event.target.value);
    };

    // Handle price range change
    const handlePriceRangeChange = (event) => {
        setPriceRange(event.target.value);
    };

    let featurePropertyTitle;

    if (sellOrRent === "sell") {
        featurePropertyTitle = "Featured Properties For Sale";
    } else if (sellOrRent === "rent") {
        featurePropertyTitle = "Featured Properties For Rent";
    } else if (isMyProperties) {
        featurePropertyTitle = "My Saved Properties";
    } else if (isMyListings) {
        featurePropertyTitle = "My Listings";
    }

    const deleteProperty = async (propertyId, loggedInUser) => {
        const token = loggedInUser?.token;
        try {
            const response = await fetch(`${API_URL}properties/delete/${propertyId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                toast.error("Unable to delete property, please try again!");
            } else {
                setAllProperties(allProperties.filter((property) => property._id !== propertyId));
                setFilteredProperties(filteredProperties.filter((property) => property._id !== propertyId));
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
                <MoonLoader cssOverride={override} size={150} aria-label="Loading Properties..." />
            </section>
        );
    }

    return (
        <section className="section has-background-white">
            <h3 className="title is-3 has-text-primary has-text-centered">{featurePropertyTitle}</h3>
            {!isHome && (
                <div className="columns is-centered">
                    <div className="column is-three-fifths">
                        <div className="field is-grouped">
                            <div className="control is-expanded">
                                <input
                                    className="input "
                                    type="text"
                                    placeholder="Search properties..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="control">
                                <div className="select">
                                    <select value={propertyType} onChange={handlePropertyTypeChange}>
                                        <option value="all">All Types</option>
                                        <option value="sell">For Sale</option>
                                        <option value="rent">For Rent</option>
                                    </select>
                                </div>
                            </div>
                            <div className="control">
                                <div className="select">
                                    <select value={priceRange} onChange={handlePriceRangeChange}>
                                        <option value="all">All Prices</option>
                                        <option value="0-1000000">Up to $1,000,000</option>
                                        <option value="1000000-2000000">$1,000,000 - $2,000,000</option>
                                        <option value="2000000-3000000">$2,000,000 - $3,000,000</option>
                                        <option value="3000000-4000000">$3,000,000 - $4,000,000</option>
                                        <option value="4000000-">Above $4,000,000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="columns is-4 is-multiline">
                {filteredProperties &&
                    filteredProperties.map((property) => (
                        <div className="column is-one-third" key={property._id}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={property.images[0] || DEFAULT_PROPERTY_IMAGE} alt="Property Image" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-5 mb-1 has-text-primary">
                                                {formatToAUD(property.price)}
                                                {property?.sellOrRent === "rent" && " Per Week"}
                                            </p>
                                            <p className="subtitle is-6">{property.address + ", " + property.suburb}</p>
                                        </div>
                                    </div>
                                    <div className="content">{property.description.substring(0, 120) + " ..."}</div>
                                </div>
                                <footer className="card-footer">
                                    <Link
                                        to={`/property/${property._id}`}
                                        className="card-footer-item has-text-primary">
                                        View More
                                    </Link>
                                    {isMyProperties && (
                                        <Link
                                            to={`/property/${property._id}`}
                                            className="card-footer-item has-text-primary">
                                            Remove
                                        </Link>
                                    )}
                                    {isMyListings && (
                                        <>
                                            <Link
                                                to={`/edit-listing/${property._id}`}
                                                className="card-footer-item has-text-primary">
                                                Edit
                                            </Link>
                                            <a
                                                className="card-footer-item has-text-primary"
                                                onClick={() => {
                                                    handleDelete(property._id, loggedInUser);
                                                }}>
                                                Remove
                                            </a>
                                        </>
                                    )}
                                </footer>
                            </div>
                        </div>
                    ))}
            </div>
            {isMyListings && (
                <button onClick={() => navigate("/new-listing")} className="button is-primary mr-3">
                    Add New Listing
                </button>
            )}
        </section>
    );
};

export default FeatureProperties;
