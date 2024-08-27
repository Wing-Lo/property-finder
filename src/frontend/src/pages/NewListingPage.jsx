import { useState, useEffect } from "react";
import { handleFileUpload } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
    display: "block",
    margin: "0 auto"
};

const NewListingPage = ({ loggedInUser }) => {
    const [propertyImage, setPropertyImage] = useState();
    const [existingImage, setExistingImage] = useState();
    const [address, setAddress] = useState("");
    const [suburb, setSuburb] = useState("");
    const [sellOrRent, setSellOrRent] = useState("sell");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const { propertyId } = useParams(); // Use this to get the property ID from the URL

    const agentId = loggedInUser?.user._id;
    const token = loggedInUser?.token;

    useEffect(() => {
        if (propertyId) {
            setIsEditMode(true);
            // Fetch property data if in edit mode
            fetch(`${API_URL}properties/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setAddress(data.address);
                    setSuburb(data.suburb);
                    setSellOrRent(data.sellOrRent);
                    setPrice(data.price);
                    setDescription(data.description);
                    if (data.images && data.images.length > 0) {
                        setExistingImage(data.images[0]);
                    }
                })
                .catch((error) => toast.error(error.message || "Failed to load property data"));
        }
    }, [propertyId, token]);

    const handleCreateListing = async () => {
        const url = `${API_URL}properties/create`;
        const body = JSON.stringify({
            address,
            suburb,
            sellOrRent,
            price,
            description,
            agent: agentId,
            images: [propertyImage] // Always send the new image if available
        });

        return await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body
        });
    };

    const handleEditListing = async () => {
        const url = `${API_URL}properties/update/${propertyId}`;
        const body = JSON.stringify({
            address,
            suburb,
            sellOrRent,
            price,
            description,
            agent: agentId,
            images: propertyImage ? [propertyImage] : [existingImage] // Use new image if uploaded, otherwise existing image
        });

        return await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = isEditMode ? await handleEditListing() : await handleCreateListing();

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || "Operation failed");
            }

            toast.success(`Property ${isEditMode ? "updated" : "added"} successfully!`);
            navigate("/my-listings");
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (isEditMode && !description) {
        return (
            <section className="section has-background-white">
                <MoonLoader cssOverride={override} size={150} aria-label="Loading Properties..." />
                <p className="has-text-centered mt-4 has-text-dark">Please wait while we load the property data...</p>
            </section>
        );
    }

    return (
        <section className="hero is-white">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5">
                            <h3 className="title is-3 has-text-centered has-text-primary">
                                {isEditMode ? "Edit Property Listing" : "Add New Listing"}
                            </h3>
                            <form className="box" onSubmit={handleFormSubmit}>
                                <div className="field">
                                    <label className="label">Address</label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="input"
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Suburb</label>
                                    <input
                                        type="text"
                                        placeholder="Suburb"
                                        className="input"
                                        value={suburb}
                                        onChange={(event) => setSuburb(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="select is-dark">
                                        <select
                                            value={sellOrRent}
                                            onChange={(event) => setSellOrRent(event.target.value)}>
                                            <option value="sell">For Sale</option>
                                            <option value="rent">For Rent</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Price</label>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        className="input"
                                        value={price}
                                        onChange={(event) => setPrice(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <textarea
                                        className="textarea"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}></textarea>
                                </div>
                                {(propertyImage || existingImage) && (
                                    <div className="field">
                                        <div>
                                            <img
                                                src={propertyImage || existingImage}
                                                alt="Property"
                                                style={{ maxWidth: "100%", height: "auto" }}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="field">
                                    <div className="file is-normal">
                                        <label className="file-label">
                                            <input
                                                className="file-input"
                                                type="file"
                                                name="propertyImage"
                                                accept=".jpeg, .png, .jpg"
                                                onChange={(e) => handleFileUpload(e, setPropertyImage)}
                                            />
                                            <span className="file-cta">
                                                <span className="file-icon">
                                                    <i className="fa fa-upload"></i>
                                                </span>
                                                <span className="file-label">Upload New Image</span>
                                            </span>
                                        </label>
                                    </div>
                                    {propertyImage && (
                                        <div className="icon-text">
                                            <span className="icon has-text-success">
                                                <i className="fas fa-check"></i>
                                            </span>
                                            <span>New Property Image Successfully uploaded</span>
                                        </div>
                                    )}
                                </div>
                                <div className="field">
                                    <button className="button is-primary mt-2" type="submit" disabled={isLoading}>
                                        {isLoading
                                            ? isEditMode
                                                ? "Updating..."
                                                : "Adding..."
                                            : isEditMode
                                            ? "Update Listing"
                                            : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewListingPage;
