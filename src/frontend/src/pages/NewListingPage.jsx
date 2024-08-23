/* eslint-disable react/prop-types */
import { useState } from "react";
import { handleFileUpload } from "../utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewListingPage = ({ loggedInUser }) => {
    const [propertyImage, setPropertyImage] = useState();
    const [address, setAddress] = useState();
    const [suburb, setSuburb] = useState();
    const [sellOrRent, setSellOrRent] = useState("sell");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const agentId = loggedInUser?.user._id;
    const token = loggedInUser?.token;

    const addNewListing = async () => {
        return await fetch("http://localhost:4000/api/properties/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                address,
                suburb,
                sellOrRent,
                price,
                description,
                agent: agentId,
                images: [propertyImage],
            }),
        })
            .then(() => {
                setIsLoading(false);
                toast.success("Successfully added a new listing!");
                navigate("/my-listings");
            })
            .catch((error) => {
                toast.error(error?.errorMessage);
            });
    };

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        try {
            await addNewListing();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="hero is-white">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5">
                            <h3 className="title is-3 has-text-centered has-text-primary">
                                Add New Listing
                            </h3>
                            <form
                                action=""
                                className="box"
                                onSubmit={handleSubmit}
                            >
                                <div className="field">
                                    <label className="label">Address</label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="input"
                                        required
                                        onChange={(event) =>
                                            setAddress(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Suburb</label>
                                    <input
                                        type="text"
                                        placeholder="Suburb"
                                        className="input"
                                        required
                                        onChange={(event) =>
                                            setSuburb(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="select is-dark">
                                        <select
                                            onChange={(event) => {
                                                setSellOrRent(
                                                    event.target.value
                                                );
                                            }}
                                            value={sellOrRent}
                                        >
                                            <option value="sell">
                                                For Sale
                                            </option>
                                            <option value="rent">
                                                For Rent
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Price</label>
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        className="input"
                                        required
                                        onChange={(event) =>
                                            setPrice(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <textarea
                                            onChange={(event) =>
                                                setDescription(
                                                    event.target.value
                                                )
                                            }
                                            className="textarea"
                                            placeholder="Description"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="file is-normal">
                                        <label className="file-label">
                                            <input
                                                className="file-input"
                                                type="file"
                                                name="propertyImage"
                                                accept=".jpeg, .png, .jpg"
                                                required
                                                onChange={(e) =>
                                                    handleFileUpload(
                                                        e,
                                                        setPropertyImage
                                                    )
                                                }
                                            />
                                            <span className="file-cta">
                                                <span className="file-icon">
                                                    <i className="fa fa-upload"></i>
                                                </span>
                                                <span className="file-label">
                                                    Upload Image
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                    {propertyImage && (
                                        <div className="icon-text">
                                            <span className="icon has-text-success">
                                                <i className="fas fa-check"></i>
                                            </span>
                                            <span>
                                                Image Successfully uploaded
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="field">
                                    <button
                                        className="button is-primary mt-2"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        Submit
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
