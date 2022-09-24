const dotenv = require('dotenv');

dotenv.config({
    path: '.env',
});

module.exports = {
    siteMetadata: {
        title: `Fress Blog`,
        siteUrl: `https://fress.blog`,
        description: `Мій блог`,
        autor: 'Sergii',
        f: 'https://www.facebook.com/',
        s:' fff',
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: '3rprsdcb',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANYTY_TOKEN,
            }
        },
        // {
        //     resolve: `gatsby-plugin-manifest`,
        //     options: {
        //         name: `GatsbyJS`,
        //         short_name: `GatsbyJS`,
        //         start_url: `/`,
        //         background_color: `#f7f0eb`,
        //         theme_color: `#a2466c`,
        //         display: `standalone`,
        //         icon: `src/assets/img/gatsby-icon.png`,
        //     },
        // },
        // {
        //     resolve: `gatsby-plugin-offline`,
        //     options: {
        //         workboxConfig: {
        //             globPatterns:  ['*.html'],
        //         },
        //     },
        // },
    ]
};