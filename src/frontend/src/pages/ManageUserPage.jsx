import Users from "../components/Users";

const ManageUserPage = ({ loggedInUser }) => {
    return (
        <>
            <Users loggedInUser={loggedInUser} />
        </>
    );
};

export default ManageUserPage;
