import React from "react";

import github from "../img/vector/social/github.svg";
import codepen from "../img/vector/social/codepen.svg";
import linkedin from "../img/vector/social/linkedin.svg";
import twitter from "../img/vector/social/twitter.svg";

const Social = (
    <span>
        <a
            title="Twitter"
            href="https://www.twitter.com/alexboffey/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon icon--hover"
        >
            <object alt="Twitter" data={twitter} type="image/svg+xml">
                Twitter
            </object>
        </a>
        <a
            title="LinkedIn"
            href="https://www.linkedin.com/in/alexboffey/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon icon--hover"
        >
            <object alt="LinkedIn" data={linkedin} type="image/svg+xml">
                LinkedIn
            </object>
        </a>
    </span>
);

const SocialIcons = ({ hasSocials }) => {
    const socials = hasSocials ? Social : "";

    return (
        <div className="social-icons">
            {socials}

            <a
                title="Github"
                href="https://www.github.com/alexboffey"
                target="_blank"
                rel="noopener noregerrer"
                className="icon icon--hover"
            >
                <object alt="Github" data={github} type="image/svg+xml">
                    Github
                </object>
            </a>
            <a
                title="Codepen"
                href="https://www.codepen.io/alexboffey"
                target="_blank"
                rel="noopener noregerrer"
                className="icon icon--hover"
            >
                <object alt="Codepen" data={codepen} type="image/svg+xml">
                    Codepen
                </object>
            </a>
        </div>
    );
};

export default SocialIcons;
