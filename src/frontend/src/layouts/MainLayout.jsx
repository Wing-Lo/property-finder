import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ loggedInUser, setLoggedInUser }) => {
    return (
        <>
            <Navbar
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
            />
            <Outlet />
            <ToastContainer />
            <Footer />
        </>
    );
};
export default MainLayout;
