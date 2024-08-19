import Hero from "../components/Hero";
import FeatureProperties from "../components/FeatureProperties";
import ContactAgent from "../components/ContactAgent";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <>
            <Hero />
            <FeatureProperties isHome={true} sellOrRent={"sell"} />
            <FeatureProperties isHome={true} sellOrRent={"rent"} />
            <ContactAgent isHome={true} />
            <Footer />
        </>
    );
};

export default HomePage;
