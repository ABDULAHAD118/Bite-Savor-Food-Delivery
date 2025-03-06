import { Link } from "react-router";
import "./404.css"; // Import the CSS file

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-icon">&#9888;</div>
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Page Not Found</h2>
                <p className="not-found-text">
                    We’re sorry, the page you have looked for does not exist in our website!
                    Maybe go to our home page or try to use a search?
                </p>
                <Link to={'/'} className="not-found-button" >Go Back To Home</Link>
            </div>
        </div>
    );
};

export default NotFound;
