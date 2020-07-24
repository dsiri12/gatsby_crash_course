const path = require('path');

exports.createPages = async ({actions, graphql}) => {
    const { createPage } = actions

    const postTemplate = path.resolve('src/templates/blog-post.js');

    const res = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        html
                        id
                        frontmatter {
                            path
                            title
                            date
                            author
                        }
                    }
                }
            }
        }
    `);

    if (res.errors) {
        console.log(res.errors)
        return;
    }

    res.data.allMarkdownRemark.edges.forEach(({node}) => {
        console.log(node.frontmatter.path)
        createPage({
            path: `${node.frontmatter.path}`,
            component: require.resolve("./src/templates/blog-post.js"),
            context: {
                path: node.frontmatter.path
            },
          })
    })
}