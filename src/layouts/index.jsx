import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/header'
import Footer from '../components/footer'

import Favicon from '../img/logo/favicon.png'

import '../scss/app.scss'

const Layout = ({ children }) =>
    <div className="page__wrapper">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Alex Boffey | Front End Developer</title>
            <link rel="shortcut icon" href={Favicon}/>
        </Helmet>
        <Header />
        <main className="page__main">
            {children()}
        </main>
        <Footer />
    </div>

export default Layout
