module.exports = {
  siteMetadata: {
    title: `eunpdc-next`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: ["gatsby-remark-smartypants"],
        remarkPlugins: [import("remark-gfm")],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: "./content/authors/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "luContent",
        path: `${__dirname}/content/learning-units`,
      },
    },
  ],
};
