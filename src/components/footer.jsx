import React from 'react'

const year = (new Date).getFullYear()

export default () =>
    <footer className="page-footer u-fill-neutral-lightest u-block-xxl u-section-top">
        <div className="u-container u-center u-text-center u-block-xxl">
            <small className="micro">&copy;{year} Alex Boffey</small>
        </div>
    </footer>
