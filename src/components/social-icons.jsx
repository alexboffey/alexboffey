import React from 'react'

import github from '../img/vector/social/github.svg'
import linkedin from '../img/vector/social/linkedin.svg'
import twitter from '../img/vector/social/twitter.svg'

export default () =>
    <div className="social-icons">
        <a href="https://www.github.com/alexboffey" target="_blank" rel="noopener noregerrer" className="icon icon--hover"><object alt="Github" data={github} type="image/svg+xml"></object></a>
        <a href="https://www.twitter.com/alexboffey/" target="_blank" rel="noopener noreferrer" className="icon icon--hover"><object alt="Twitter" data={twitter} type="image/svg+xml"></object></a>
        <a href="https://www.linkedin.com/in/alexboffey/" target="_blank" rel="noopener noreferrer" className="icon icon--hover"><object alt="LinkedIn" data={linkedin} type="image/svg+xml"></object></a>
    </div>
