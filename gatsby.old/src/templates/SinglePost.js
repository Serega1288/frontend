import React from 'react';
import  { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import ItemCard from '../components/ItemCard';
import SinglePostStyles from '../styles/SinglePostStyles';
import {CATEGORY_LABELS_LIST} from "../constants";
import Meta from '../components/Meta';

const SinglePost = props => {
    const { data, pageContext } = props;
    const { post } = data;
    const {previous , next } = pageContext;
    //console.log('single!!!');
    return (
        <Layout>
            {/* для додаткових мета даних для окремих сторінок.*/}
            <Meta title={post.title} >
                <meta name="test" content="Ура" />
            </Meta>
            <SinglePostStyles>
                <h1>{post.title}</h1>
                <div className="singlePostMeta">
                    {post.categories.map(categoty => (
                        <span key={categoty.id} className="tagTitle">
                              {CATEGORY_LABELS_LIST[categoty.title]}
                        </span>
                    ))}
                    <span className="postDate">Обновлено {post._updatedAt}</span>
                </div>
                <Img fluid={post.image.asset.fluid} />
                <p>{post.body}</p>
                <hr />
                <h3>Ще новини...</h3>
                <div className="moreItems">
                    { previous && <ItemCard post={previous} /> }
                    { next && <ItemCard post={next} /> }
                </div>
            </SinglePostStyles>
        </Layout>
    )
};
export default SinglePost;


export const query = graphql`
    query( $slug: String! ) {
        post: sanityPost(slug: { current: { eq: $slug } }) {
            title
            id
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
                fluid(maxWidth: 1000) {
                  ...GatsbySanityImageFluid
                }
              }
            }
        }
    }
`