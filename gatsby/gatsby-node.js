const path = require('path');


// template
const postTemplate = path.resolve('./src/templates/SinglePost.js');
const frontTemplate = path.resolve('./src/templates/FrontPage.js');
const categoryTemplate = path.resolve('./src/templates/SingleCategory.js');

// create home page
const createFrontPage = (createPage, posts) => {

    const { nodes } = posts;
    const postsPerPage = 4;
    const numPages = Math.ceil(nodes.length / postsPerPage);

    Array.from({length: numPages}).forEach((_,i) =>{
        createPage({
            path: i === 0 ? '/' : `/page/${i + 1}`,
            component: frontTemplate,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            }
        })
    })
}

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;

    return graphql(`
        {
            posts: allSanityPost {
                nodes {
                    title
                    id
                    body
                    _updatedAt(formatString: "DD-MM-YYYY")
                    slug {
                        current
                    }
                    categories {
                        id
                        title
                    }
                    image {
                        asset {
                            id
                            fluid(maxWidth: 1000) {
                              base64
                              aspectRatio
                              src
                              srcSet
                              srcWebp
                              srcSetWebp
                              sizes
                            }
                        }
                    }
                }
            }
            categories: allSanityCategory {
                nodes {
                    title
                    id
                }
            }
        }
    `).then(results => {
        if (results.error) {
            throw  results.errors;
        }
        const  { posts, categories } = results.data;
       // console.log('posts >>', posts.nodes)
        //console.log('categories >>', categories.nodes)


        // 1. cread pages do post
        posts.nodes.forEach((post, index) => {
            const  previous = index === posts.nodes.length - 1 ? null : posts.nodes[index + 1];
            const  next = index === 0 ? null : posts.nodes[index - 1];

           createPage({
               path: `${post.slug.current}`,
               component: postTemplate,
               context: {
                   slug: post.slug.current,
                   previous,
                   next,
               }
           })
        });

        // 2. home page
        createFrontPage( createPage, posts )


        // categoty  categoryTemplate

        categories.nodes.forEach(category => {

            createPage({
                path: `/categories/${category.title.toLowerCase()}`,
                component: categoryTemplate,
                context: {
                    categoryTitle: category.title,
                    posts,
                }
            })

        });

    });
};

