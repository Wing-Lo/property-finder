import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import RentPage from "./pages/RentPage";
import AgentPage from "./pages/AgentPage";
import PropertyInfoPage from "./pages/PropertyInfoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPropertiesPage from "./pages/MyPropertiesPage";
import MyListingsPage from "./pages/MyListingsPage";
import NewListingPage from "./pages/NewListingPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState();

    useEffect(() => {
        setLoggedInUser(
            sessionStorage.getItem("loggedInUser") ||
                localStorage.getItem("loggedInUser")
        );
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route
                path="/"
                element={
                    <MainLayout
                        loggedInUser={loggedInUser}
                        setLoggedInUser={setLoggedInUser}
                    />
                }
            >
                <Route index element={<HomePage />} />
                <Route path="buy" element={<BuyPage />} />
                <Route path="rent" element={<RentPage />} />
                <Route path="agent" element={<AgentPage />} />
                <Route
                    path="login"
                    element={
                        <LoginPage
                            loggedInUser={loggedInUser}
                            setLoggedInUser={setLoggedInUser}
                        />
                    }
                />
                <Route path="register" element={<RegisterPage />} />
                <Route path="my-properties" element={<MyPropertiesPage />} />
                <Route path="my-listings" element={<MyListingsPage />} />
                <Route path="new-listing" element={<NewListingPage />} />
                <Route
                    path="/property/:propertyId"
                    element={<PropertyInfoPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
