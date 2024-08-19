/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Hero = ({
    title = "Make your next move",
    subtitle = "Discover your perfect home with ease. Whether you're ready to buy or rent, we have the ideal property waiting for you. Take the next step in your journey and explore options tailored to your needs. Click below to find your dream home today.",
}) => {
    const navigate = useNavigate();

    return (
        <section className="hero is-medium">
            <div className="hero-body">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
                <button
                    onClick={() => navigate("/buy")}
                    className="button is-primary mr-2"
                >
                    Buy
                </button>

                <button
                    onClick={() => navigate("/rent")}
                    className="button is-secondary"
                >
                    Rent
                </button>
            </div>
        </section>
    );
};
export default Hero;