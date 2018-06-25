module.exports = {
    siteMetadata: {
        title: "Alex Boffey"
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-catch-links",
        "gatsby-plugin-offline",
        "gatsby-plugin-sass",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "UA-74503764-1",
                anonymize: true,
                head: false
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: ["gatsby-remark-prismjs"]
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/posts`,
                name: "pages"
            }
        }
    ]
};
