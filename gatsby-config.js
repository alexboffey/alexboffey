module.exports = {
    pathPrefix: '/alexboffey',
    siteMetadata: {
        title: 'Alex Boffey'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-catch-links',
        'gatsby-plugin-offline',
        'gatsby-plugin-sass',
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/posts`,
                name: 'pages'
            }
        }
    ]
}
