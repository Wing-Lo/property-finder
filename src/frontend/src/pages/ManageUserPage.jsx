import Users from "../components/Users";

const ManageUserPage = ({ loggedInUser, setLoggedInUser }) => {
    return (
        <>
            <Users loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        </>
    );
};

export default ManageUserPage;
