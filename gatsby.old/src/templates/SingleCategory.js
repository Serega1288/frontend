import React from "react";
import Layout from "../components/Layout";
import BlogPosts from "../components/BlogPosts";
import Meta from '../components/Meta';
import {CATEGORY_LABELS_LIST} from "../constants";

const SingleCategory = props => {
    const { pageContext, location } = props;
    const { posts, categoryTitle } = pageContext;

    const postsForCategory = posts.nodes.filter(post =>
       post.categories.some(category => category.title === categoryTitle)
    );
    return (
        <Layout>
            <Meta
                title={CATEGORY_LABELS_LIST[categoryTitle]}
                description={`${CATEGORY_LABELS_LIST[categoryTitle]}: все про травел`}
            >
                <link rel="canonical" href={location.href} />
            </Meta>
            <BlogPosts posts={postsForCategory} />
        </Layout>
    );
};

export default SingleCategory;