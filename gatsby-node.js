const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      chapters: allFile(filter: { extension: { eq: "mdx" }, name: { ne: "index" }, sourceInstanceName: { eq: "luContent" } }) {
        nodes {
          id
          childMdx {
            fields {
              slug
            }
            internal {
              contentFilePath
            }
            frontmatter {
              unit
            }
          }
        }
      }
      units: allFile(filter: { extension: { eq: "mdx" }, name: { eq: "index" }, sourceInstanceName: { eq: "luContent" } }) {
        nodes {
          id
          childMdx {
            fields {
              slug
            }
            frontmatter {
              unit
            }
          }
        }
      }
    }
  `);

  data.chapters.nodes.forEach((node) => {
    const slug = node.childMdx.fields.slug;
    const lu_id = node.childMdx.frontmatter.unit;
    const id = node.id;
    const template = require.resolve(`./src/components/Chapter.js`);
    actions.createPage({
      path: slug,
      component: `${template}?__contentFilePath=${node.childMdx.internal.contentFilePath}`,
      context: { id: id, lu_id: lu_id },
    });
  });

  data.units.nodes.forEach((node) => {
    const id = node.id;
    const slug = node.childMdx.fields.slug;
    const lu_id = node.childMdx.frontmatter.unit;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/LearningUnit.js`),
      context: { id: id, lu_id: lu_id },
    });
  });
};

exports.onCreateNode = ({ node, actions, createNodeId, getNode }) => {
  if (node.internal.type === "Mdx" && node.internal.contentFilePath.indexOf("authors") !== -1) {
    console.log(node.internal.contentFilePath);
    actions.createNode({
      id: createNodeId(`author-${node.id}`),
      parent: node.id,
      author_id: node.frontmatter.author_id,
      frontmatter: node.frontmatter,
      internal: {
        type: `Author`,
        contentDigest: node.internal.contentDigest,
      },
    });
  }
  if (node.internal.type === "Mdx") {
    actions.createNodeField({
      node,
      name: "slug",
      value: createFilePath({ node, getNode }),
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
  type Author implements Node {
    author_id: String
    image: File
  }
  type FrontMatter {
    authors: [Author] @link(by: "author_id")
  }
  type Mdx {
    frontmatter: FrontMatter
  }
  `;
  createTypes(typeDefs);
};
