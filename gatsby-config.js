module.exports = {
    pathPrefix: '/alexboffey.github.io',
    siteMetadata: {
        title: 'Alex Boffey'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './src/posts',
                name: 'pages'
            }
        }
    ]
}
