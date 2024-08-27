import { useNavigate } from "react-router-dom";

const Hero = ({
    title = "Make your next move",
    subtitle = "Discover your perfect home with ease. Whether you're ready to buy or rent, we have the ideal property waiting for you. Take the next step in your journey and explore options tailored to your needs. Click below to find your dream home today."
}) => {
    const navigate = useNavigate();

    return (
        <section
            data-testid="hero-section"
            className="hero is-medium is-black"
            style={{
                backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AincCKlvJ3KUx5oymiqxWTS8DSSt0ZGXHnTXS3zXtMvmdc2Qt7xoyUD7eUFPCz19CZU&usqp=CAU')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}>
            <div className="hero-body has-text-centered">
                <div className="columns">
                    <div className="column is-three-fifths is-offset-one-fifth">
                        <p className="title is-2 mb-4  has-text-dark">{title}</p>
                        <p className="subtitle  has-text-dark">{subtitle}</p>
                        <button onClick={() => navigate("/buy")} className="button is-primary mr-3">
                            Buy
                        </button>

                        <button onClick={() => navigate("/rent")} className="button is-secondary">
                            Rent
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Hero;
