import React from 'react'
import Link from 'gatsby-link'

import github from '../img/vector/social/github.svg'
import linkedin from '../img/vector/social/linkedin.svg'
import twitter from '../img/vector/social/twitter.svg'

const year = (new Date).getFullYear()

const Footer = () =>
    <footer className="page-footer u-fill-neutral-lightest u-block-xxl u-section-top">
        <div className="u-container u-center u-text-center">
            <div className="u-section-xs u-hidden-lg u-hidden-xl">
                <a href="https://www.github.com/alexboffey" target="_blank" rel="noopener noregerrer" className="icon icon--hover"><object data={github} type="image/svg+xml"></object></a>
                <a href="https://www.twitter.com/alexboffey/" target="_blank" rel="noopener noreferrer" className="icon icon--hover"><object data={twitter} type="image/svg+xml"></object></a>
                <a href="https://www.linkedin.com/in/alexboffey/" target="_blank" rel="noopener noreferrer" className="icon icon--hover"><object data={linkedin} type="image/svg+xml"></object></a>
            </div>

            <div className="u-section-xs">
                <p className="micro">&copy;{year} Alex Boffey</p>
            </div>
        </div>
    </footer>

export default Footer
