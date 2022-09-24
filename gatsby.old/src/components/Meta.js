import React from "react";
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';


const Meta = ({ children,  title, description }) => {

    const { site } = useStaticQuery(graphql`
        query {
            site { 
                siteMetadata {
                  title
                  description
                }
            }
        }
    `);

    //console.log('siteData >', site );
    return (
        <Helmet templateTemplate={`%s - ${site.siteMetadata.title}`}>
            <html lang="ua" />
            <title>{ title }</title>
            <meta name='description' content={description || site.siteMetadata.description } />
            { children }
        </Helmet>
    )
};
export default Meta;