import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Base from "./Base";
import { MDXProvider } from "@mdx-js/react";
import * as ChapterStyles from "./Chapter.module.scss";
import { Quiz, MultipleChoice } from "./Quiz.js";
import Quote from "./Quote.js";
import Term from "./Term";
import Figure from "./Figure";
import LectureVideo from "./LectureVideo";

const shortCodes = { Quiz, MultipleChoice, Quote, Term, Figure, LectureVideo };

export const query = graphql`
  query ($id: String, $lu_id: String) {
    post: file(id: { eq: $id }) {
      childMdx {
        frontmatter {
          title
          intro
          order
        }
        body
      }
    }
    chapters: allFile(
      filter: { childMdx: { frontmatter: { unit: { eq: $lu_id } } }, name: { ne: "index" }, ext: { eq: ".mdx" } }
      sort: { fields: childMdx___frontmatter___order }
    ) {
      nodes {
        name
        childMdx {
          slug
          frontmatter {
            title
            intro
            order
          }
        }
      }
    }
    unit: file(name: { eq: "index" }, childMdx: { frontmatter: { unit: { eq: $lu_id } } }) {
      name
      childMdx {
        slug
        frontmatter {
          title
          order
        }
      }
    }
  }
`;
const Chapter = ({ data, pageContext }) => {
  const frontmatter = data.post.childMdx.frontmatter;

  const next = data.chapters.nodes.find((el) => {
    return el.childMdx.frontmatter.order > frontmatter.order;
  });

  return (
    <Base>
      <article className={ChapterStyles.container}>
        <header className={ChapterStyles.header}>
          <Link className={ChapterStyles.unit} to={`../../${data.unit.childMdx.slug}`}>
            <span>Unit {data.unit.childMdx.frontmatter.order}/25</span>
          </Link>
          <h1 className={ChapterStyles.title}>{frontmatter.title}</h1>
          <p className={ChapterStyles.intro}>{frontmatter.intro}</p>
        </header>
        <div className={ChapterStyles.body}>
          <MDXProvider components={shortCodes}>
            <MDXRenderer>{data.post.childMdx.body}</MDXRenderer>
          </MDXProvider>
          {next && (
            <nav className={ChapterStyles.pagination}>
              <Link to={`../../${next.childMdx.slug}`}>
                <span className={ChapterStyles.paginationLabel}>Next</span>
                <span className={ChapterStyles.paginationTitle}>
                  {next.childMdx.frontmatter.order}. {next.childMdx.frontmatter.title}
                </span>
                <p>{next.childMdx.frontmatter.intro}</p>
              </Link>
            </nav>
          )}
        </div>
      </article>
    </Base>
  );
};

export default Chapter;
