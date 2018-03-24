import React from "react";
import Icons from "./icons";

const year = new Date().getFullYear();

const Footer = () => (
    <footer className="page-footer">
        <div className="u-container u-center u-section-sm u-text-center">
            <div className="u-section-xs">
                <Icons hasSocials />
            </div>

            <footer className="u-section-xs">
                <p className="micro">&copy;{year} Alex Boffey</p>
            </footer>
        </div>
    </footer>
);

export default Footer;
