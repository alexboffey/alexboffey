// Import Styles
import '../scss/app.scss'

// JS Modules
import React from 'react'

// Components
import Header from '../components/header'
import Footer from '../components/footer'

export default ({ children }) =>
    <div className="page__wrapper">
        <Header />

        <main className="page__main">
            {children()}
        </main>

        <Footer />
    </div>
