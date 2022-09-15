import React from "react";
import { graphql, Link } from "gatsby";
import * as LuStyles from "./LearningUnit.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import App from "./App";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import useLocalStorage from "./useLocalStorage";
import Counter from "./Counter";
import MarkdownRenderer from "react-markdown-renderer";

export const query = graphql`
  query ($id: String, $lu_id: String) {
    post: file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          title
          authors {
            frontmatter {
              name
              institution
            }
            parent {
              ... on Mdx {
                body
              }
            }
          }
          intro
          order
          hero_alt
          hero_credit
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 1000, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
    chapters: allFile(
      filter: { extension: { eq: "mdx" }, name: { ne: "index" }, sourceInstanceName: { eq: "luContent" }, relativeDirectory: { eq: $lu_id } }
      sort: { order: ASC, fields: childMdx___frontmatter___order }
    ) {
      nodes {
        id
        name
        relativeDirectory
        childMdx {
          fields {
            slug
          }
          frontmatter {
            title
            intro
            reading_time
          }
        }
      }
    }
  }
`;

const LearningUnit = ({ data, context }) => {
  const frontmatter = data.post.childMdx.frontmatter;
  const authors = data.post.childMdx.frontmatter.authors;
  const heroImage = getImage(frontmatter.hero_image);
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  const bylines = authors.map((author) => {
    const fm = author.frontmatter;
    return (
      <li key={fm.name} className={LuStyles.byline}>
        <em>{fm.name}</em>
        <span>{fm.institution}</span>
      </li>
    );
  });
  const bios = authors.map((author) => {
    const fm = author.frontmatter;
    const authorImage = getImage(fm.image);
    return (
      <li className={LuStyles.author} key={fm.author_id}>
        <div className={LuStyles.authorHeader}>
          <GatsbyImage className={LuStyles.authorImage} image={authorImage} alt={fm.hero_alt} />
          <div>
            <h3 className={LuStyles.authorTitle}>{fm.name}</h3>
            <span className={LuStyles.authorInstitution}>{fm.institution}</span>
          </div>
        </div>
        <MarkdownRenderer markdown={author.parent.body} />
      </li>
    );
  });
  const chapterLinks = data.chapters.nodes.map((node, index) => {
    const frontmatter = node.childMdx.frontmatter;
    return (
      <li key={node.name}>
        <Link to={node.name}>
          <h3 className={LuStyles.chapterTitle}>
            <Counter n={index + 1} />
            {frontmatter.title}
          </h3>
          <p className={LuStyles.chapterIntro}>{frontmatter.intro}</p>
          <p className={LuStyles.chapterMeta}>{frontmatter.reading_time} min read</p>
        </Link>
      </li>
    );
  });
  return (
    <App>
      <SiteHeader unit={frontmatter.order} chapter={""} bookmarks={bookmarks} />
      <article className={LuStyles.container}>
        <header className={LuStyles.header}>
          <div className={LuStyles.headerInner}>
            <GatsbyImage className={LuStyles.headerImage} image={heroImage} alt={frontmatter.hero_alt} />
            <div className={LuStyles.headerCopy}>
              <p className={LuStyles.headerEyebrow}>Unit {frontmatter.order}</p>
              <h1 className={LuStyles.headerTitle}>{frontmatter.title}</h1>
              <p className={LuStyles.headerIntro}>{frontmatter.intro}</p>
              <ul>{bylines}</ul>
              <p className={LuStyles.headerCredit}>{frontmatter.hero_credit}</p>
            </div>
          </div>
        </header>
        <main>
          <section className={LuStyles.chapters}>
            <h2 className={LuStyles.sectionTitle}>Chapters</h2>
            <div className="section__content">
              <ol>{chapterLinks}</ol>
            </div>
          </section>
          <section className="authors">
            <h2 className={LuStyles.sectionTitle}>Credits</h2>
            <div className="section__content">{bios}</div>
          </section>
          <section>
            <h2 className={LuStyles.sectionTitle}>Disclosures</h2>
            <div className={LuStyles.disclosures}>
              <h3>Funding</h3>
              <p>
                This Learning Unit was produced with financial assistance from the European Union. The contents of this Learning Unit are however the
                sole responsibility of the author(s) and should under no circumstances be regarded as reflecting the position of the European Union.
              </p>
              <h3>Content Warning</h3>
              <p>This learning unit may contain audio-visual material or texts, which may not be suitable for all audiences. </p>
              <h3>External Links</h3>
              <p>
                The site may contain hyperlink text references (’Links’) to other sites that are offered by third parties. These Links are made solely
                for the purpose of information and as an additional service for users. Only the respective operator is responsible for all content and
                statements on linked Internet sites. Therefore, HSFK cannot guarantee for the correctness and accuracy or any other aspect of third
                party sites.
              </p>
            </div>
          </section>
        </main>
      </article>
      <SiteFooter />
    </App>
  );
};

export function Head({ data }) {
  const post = data.post.childMdx.frontmatter;
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.intro} />
    </>
  );
}

export default LearningUnit;
