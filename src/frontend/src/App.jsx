import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import RentPage from "./pages/RentPage";
import AgentPage from "./pages/AgentPage";
import PropertyInfoPage from "./pages/PropertyInfoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPropertiesPage from "./pages/MyPropertiesPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="buy" element={<BuyPage />} />
                <Route path="rent" element={<RentPage />} />
                <Route path="agent" element={<AgentPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="myproperties" element={<MyPropertiesPage />} />
                <Route
                    path='/property/:propertyId'
                    element={<PropertyInfoPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;
