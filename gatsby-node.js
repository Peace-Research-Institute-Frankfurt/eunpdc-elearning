const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      chapters: allFile(filter: { extension: { eq: "mdx" }, name: { ne: "index" }, sourceInstanceName: { eq: "luContent" } }) {
        nodes {
          id
          childMdx {
            slug
          }
        }
      }
      units: allFile(filter: { extension: { eq: "mdx" }, name: { eq: "index" }, sourceInstanceName: { eq: "luContent" } }) {
        nodes {
          id
          childMdx {
            slug
          }
        }
      }
    }
  `);

  data.chapters.nodes.forEach((node) => {
    const slug = node.childMdx.slug;
    const id = node.id;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/Chapter.js`),
      context: { id: id },
    });
  });

  data.units.nodes.forEach((node) => {
    const id = node.id;
    const slug = node.childMdx.slug;
    const lu_id = node.childMdx.lu_id;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/LearningUnit.js`),
      context: { id: id, lu_id: lu_id },
    });
  });
};

exports.onCreateNode = ({ node, actions, createNodeId, getNode }) => {
  if (node.internal.type == "Mdx" && node.fileAbsolutePath.indexOf("authors") !== -1) {
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
