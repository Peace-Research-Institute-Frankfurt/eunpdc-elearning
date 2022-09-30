const { createFilePath } = require(`gatsby-source-filesystem`);
const { compileMDXWithCustomOptions } = require(`gatsby-plugin-mdx`);
const { remarkHeadingsPlugin } = require(`./remark-headings-plugin`);

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      chapters: allFile(filter: { extension: { eq: "mdx" }, name: { ne: "index" }, sourceInstanceName: { eq: "luContent" } }) {
        nodes {
          id
          relativeDirectory
          childMdx {
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
      units: allFile(filter: { extension: { eq: "mdx" }, name: { eq: "index" }, sourceInstanceName: { eq: "luContent" } }) {
        nodes {
          id
          relativeDirectory
          childMdx {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  data.chapters.nodes.forEach((node) => {
    const slug = node.childMdx.fields.slug;
    const lu_id = node.relativeDirectory;
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
    const lu_id = node.relativeDirectory;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/LearningUnit.js`),
      context: { id: id, lu_id: lu_id },
    });
  });
};

exports.onCreateNode = ({ node, actions, createNodeId, getNode }) => {
  if (node.internal.type === "Mdx" && node.internal.contentFilePath.indexOf("authors") !== -1) {
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

exports.createSchemaCustomization = async ({ getNode, getNodesByType, pathPrefix, reporter, cache, actions, schema }) => {
  const { createTypes } = actions;

  const headingsResolver = schema.buildObjectType({
    name: `Mdx`,
    fields: {
      headings: {
        type: `[MdxHeading]`,
        async resolve(mdxNode) {
          const fileNode = getNode(mdxNode.parent);

          if (!fileNode) {
            return null;
          }

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: {},
              customOptions: {
                mdxOptions: {
                  remarkPlugins: [remarkHeadingsPlugin],
                },
              },
              getNode,
              getNodesByType,
              pathPrefix,
              reporter,
              cache,
            }
          );

          if (!result) {
            return null;
          }

          return result.metadata.headings;
        },
      },
    },
  });

  createTypes([
    `
      type MdxHeading {
        value: String
        depth: Int
      }
    `,
    headingsResolver,
  ]);

  const typeDefs = `
  type Author implements Node {
    author_id: String
    image: File
  }
  type FrontMatter {
    hero_image: File @fileByRelativePath
    authors: [Author] @link(by: "author_id")
  }
  type Mdx {
    frontmatter: FrontMatter
  }
  `;
  createTypes(typeDefs);
};
