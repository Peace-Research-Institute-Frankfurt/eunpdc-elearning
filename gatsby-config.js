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
        name: "data",
        path: "./content/data/",
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `EUNPDC E-Learning`,
        icon: `src/assets/favicon.png`,
        short_name: `EUNPDC E-Learning`,
        start_url: `/`,
        background_color: `#eeeeee`,
        theme_color: `#0076A9`,
        display: `standalone`,
      },
    },
  ],
};
