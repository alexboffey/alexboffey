// Import Styles
import '../scss/app.scss'

// JS Modules
import React from 'react'

// Components
import Header from '../components/header'

export default ({ children }) =>
    <div className="page-wrapper">
        <Header />
    
        <main className="u-container-md">
            {children()}
        </main>
    </div>
