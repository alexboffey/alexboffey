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
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-prismjs'
                ]
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/posts`,
                name: 'pages'
            }
        }
    ]
}
