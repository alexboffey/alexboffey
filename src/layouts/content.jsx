import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const Section = Styled.section`
    animation: Fade 300ms ease;

    @keyframes Fade {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`

const Content = ({ children, isFullWidth }) => {
    const columnsClass = isFullWidth ? 'g-col-xs-12' : 'g-col-sm-10 g-col-lg-9 g-col-xl-8'

    return (
        <Section className="content__main u-section u-fill-neutral-readable">
            <div className="u-container-lg">
                <div className="u-section u-block grid">
                    <div className={columnsClass}>
                        { children }
                    </div>
                </div>
            </div>
        </Section>
    )
}

Content.propTypes = {
    isFullWidth: PropTypes.bool
}

export default Content
