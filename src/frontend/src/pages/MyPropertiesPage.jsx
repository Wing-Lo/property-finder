import FeatureProperties from "../components/FeatureProperties";

const MyPropertiesPage = ({ loggedInUser }) => {
    return (
        <FeatureProperties isMyProperties={true} loggedInUser={loggedInUser} />
    );
};

export default MyPropertiesPage;
