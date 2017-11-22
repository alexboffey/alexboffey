import React from 'react'
import Styled from 'styled-components'

const Section = Styled.section`
    animation: Fade 300ms ease;

    @keyframes Fade {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`

export default ({ children }) =>
    <Section className="content__wrapper u-fill-neutral-white">
        {children}
    </Section>
