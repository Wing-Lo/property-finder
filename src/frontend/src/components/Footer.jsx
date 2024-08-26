const Footer = () => {
    return (
        <footer className="footer has-background-dark">
            <div className="content has-text-centered">
                <p className="subtitle is-6">
                    <strong>Property Finder &copy; {new Date().getFullYear()}</strong>
                </p>
                <div className="content">
                    <a href="/buy" className="button is-text">
                        Property For Sale
                    </a>
                    <span className="mx-2">|</span>
                    <a href="/rent" className="button is-text">
                        Property For Rent
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
