const wrapESMPlugin = (name) =>
  function wrapESM(opts) {
    return async (...args) => {
      const mod = await import(name);
      const plugin = mod.default(opts);
      return plugin(...args);
    };
  };

module.exports = {
  siteMetadata: {
    title: `eunpdc-next`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        mdxOptions: {
          remarkPlugins: [require("remark-gfm")],
          rehypePlugins: [wrapESMPlugin("rehype-slug")],
        },
        gatsbyRemarkPlugins: ["gatsby-remark-smartypants", "gatsby-plugin-remark-footnotes"],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: `${__dirname}/content/authors/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/content/data/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "luContent",
        path: `${__dirname}/content/learning-units`,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "chapters",
        engine: "flexsearch",
        // engineOptions: 'speed',
        query: `
          {
            allFile(filter: { extension: { eq: "mdx" }, name: { ne: "index" }, sourceInstanceName: { eq: "luContent" } }) {
              nodes {
                id
                childMdx {
                  frontmatter {
                    title
                  }
                 
                }
              }
            }
          }
        `,
        ref: "id",
        index: ["title"],
        store: ["id", "title"],
        normalizer: ({ data }) =>
          data.nodes.map((node) => ({
            id: node.id,
            title: node.childMdx.frontmatter.title,
          })),
      },
    },
  ],
};
