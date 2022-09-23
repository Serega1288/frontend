import React from 'react';
import { graphql } from 'gatsby';
import Meta from '../components/Meta';
import BlogPosts from '../components/BlogPosts';
import Pagination from '../components/Pagination';
import Layout from '../components/Layout';

// const HomePage = () => (
//     <Layout test="Woow" number={100}>
//         <h1>Головна сторінка</h1><p>Наша голован сторінка</p>
//     </Layout>
// );


const FrontPage = props => {
    const { data, pageContext } = props;
    const posts = data.posts.nodes;
    return (
        <Layout>
            <Meta title="Home" />
            <BlogPosts posts={posts} />
            <Pagination pageContext={pageContext} />
        </Layout>
    );
};

export default FrontPage;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 4) {
    posts: allSanityPost(limit: $pageSize, skip: $skip) {
      nodes {
        id
        title
        _updatedAt(formatString: "DD-MM-YYYY")
        body
        categories {
          title
          id
        }
        slug {
          current
        }
        image {
          asset {
            # fixed(width: 200, height: 200) {
            #   ...GatsbySanityImageFixed
            # }
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;