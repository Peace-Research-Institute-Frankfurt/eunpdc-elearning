import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as LuStyles from "./LearningUnit.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Base from "./Base.js";
import SiteHeader from "./SiteHeader";
import Counter from "./Counter";

export const query = graphql`
  query LearningUnitQuery($id: String) {
    post: file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          title
          intro
          hero_alt
          order
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 1000, layout: FULL_WIDTH)
            }
          }
          authors {
            parent {
              ... on Mdx {
                body
              }
            }
            frontmatter {
              name
              author_id
              institution
              image {
                childImageSharp {
                  gatsbyImageData(width: 100)
                }
              }
            }
          }
        }
      }
    }
    chapters: allFile(
      filter: { extension: { eq: "mdx" }, name: { ne: "index" }, sourceInstanceName: { eq: "luContent" } }
      sort: { order: ASC, fields: childMdx___frontmatter___order }
    ) {
      nodes {
        id
        name
        childMdx {
          slug
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
  const heroImage = getImage(frontmatter.hero_image);
  const bylines = frontmatter.authors.map((author) => {
    return (
      <li key={author.frontmatter.name} className={LuStyles.byline}>
        <em>{author.frontmatter.name}</em>
        <span>{author.frontmatter.institution}</span>
      </li>
    );
  });
  const bios = frontmatter.authors.map((author) => {
    const authorImage = getImage(author.frontmatter.image);
    return (
      <li className={LuStyles.author} key={author.frontmatter.author_id}>
        <div className={LuStyles.authorHeader}>
          <GatsbyImage className={LuStyles.authorImage} image={authorImage} alt={frontmatter.hero_alt} />
          <div>
            <h3 className={LuStyles.authorTitle}>{author.frontmatter.name}</h3>
            <span className={LuStyles.authorInstitution}>{author.frontmatter.institution}</span>
          </div>
        </div>
        <MDXRenderer>{author.parent.body}</MDXRenderer>
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
          <p className="chapter-intro">{frontmatter.intro}</p>
          <p className={LuStyles.chapterMeta}>{frontmatter.reading_time} min read</p>
        </Link>
      </li>
    );
  });
  return (
    <Base>
      <SiteHeader unit={frontmatter.order} chapter={""} />
      <article className={LuStyles.container}>
        <header className={LuStyles.header}>
          <div className={LuStyles.headerInner}>
            <div>
              <GatsbyImage image={heroImage} alt={frontmatter.hero_alt} />
            </div>
            <div className={LuStyles.headerCopy}>
              <p className={LuStyles.headerEyebrow}>Unit {frontmatter.order}</p>
              <h1 className={LuStyles.headerTitle}>{frontmatter.title}</h1>
              <p className={LuStyles.headerIntro}>{frontmatter.intro}</p>
              <ul>{bylines}</ul>
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
            <h2 className={LuStyles.sectionTitle}>About the author</h2>
            <div className="section__content">{bios}</div>
          </section>
          <section className={LuStyles.disclosures}>
            <div className="section__content">
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
    </Base>
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
