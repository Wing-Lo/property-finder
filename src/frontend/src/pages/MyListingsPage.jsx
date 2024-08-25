import FeatureProperties from "../components/FeatureProperties";

const MyListingsPage = ({ loggedInUser }) => {
    return (
        <FeatureProperties isMyListings={true} loggedInUser={loggedInUser} />
    );
};

export default MyListingsPage;
