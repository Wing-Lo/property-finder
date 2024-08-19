import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <section className="section hero is-dark is-large">
            <div className="icon-text">
                <span className="icon has-text-warning">
                    <FaExclamationTriangle />
                </span>
                <span>Warning</span>
            </div>
            <h3 className="title is-3">404 Not Found</h3>
            <p className="mb-2"> This page does not exist</p>
            <div>
                <button
                    onClick={() => navigate("/")}
                    className="button is-primary"
                >
                    Go Back
                </button>
            </div>
        </section>
    );
};
export default NotFoundPage;
