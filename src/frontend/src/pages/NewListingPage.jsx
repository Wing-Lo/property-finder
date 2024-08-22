import { useState } from "react";
import { handleFileUpload } from "../utils";

const NewListingPage = () => {
    const [propertyImage, setPropertyImage] = useState();

    return (
        <section className="hero is-white">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5">
                            <h3 className="title is-3 has-text-centered has-text-primary">
                                Add New Listing
                            </h3>
                            <form action="" className="box">
                                <div className="field">
                                    <label className="label">Address</label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Suburb</label>
                                    <input
                                        type="text"
                                        placeholder="Suburb"
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="select is-dark">
                                        <select>
                                            <option>For Sale</option>
                                            <option>For Rent</option>
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
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <textarea
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
                                    <button className="button is-primary mt-2">
                                        Add
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
