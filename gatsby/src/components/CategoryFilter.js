import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import CategoryFilterStyles from '../styles/CategoryFilterStyles';
import { CATEGORY_LABELS_LIST } from '../constants';

const countPostsInCategories = posts => {
    const catCounts = posts.map(post => post.categories)
        .flat()
        .reduce( (accum,curVal) => {
            if ( !accum[curVal.id] ) {
                accum[curVal.id] = {
                    ...curVal,
                    count: 1,
                }
            } else {
                accum[curVal.id] = {
                    ...curVal,
                    count: accum[curVal.id].count + 1,
                }
            }
            return accum;
        }, {} )

    const sortedCategories = Object.values(catCounts).sort(
        (a,b) => a.count - b.count
    );

    return sortedCategories;

    //console.log('sortedCategories >', sortedCategories);
}

const CategotyFilter = () => {

    const { posts } = useStaticQuery(graphql`
        query {
            posts: allSanityPost {
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
                  fluid(maxWidth: 410) {
                    ...GatsbySanityImageFluid
                  }
                }
              }
            }
        }
        }
    `);


    const categoriesWithCounts = countPostsInCategories(posts.nodes);
    //console.log('categoriesWithCounts >>>', categoriesWithCounts );
    return (
        <CategoryFilterStyles>
            <Link to='/'>
                <span className="tagTitle">
                    Все
                </span>
                <span className="tagCount">
                    {posts.nodes.length}
                </span>
            </Link>
            {categoriesWithCounts.map( categoty => (
                <Link
                    key={categoty.id}
                    to={`/categories/${categoty.title.toLowerCase()}`}
                >
                    <span className="tagTitle">{CATEGORY_LABELS_LIST[categoty.title]}</span>
                    <span className="tagCount">{categoty.count}</span>
                </Link>
            ))}
        </CategoryFilterStyles>
    );

}
export default CategotyFilter;