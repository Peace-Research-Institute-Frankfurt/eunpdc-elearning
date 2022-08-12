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
import Counter from "./Counter";
import Footnote from "./Footnote";
import { Timeline, Event } from "./Timeline";

const shortCodes = { Quiz, MultipleChoice, Quote, Term, Figure, LectureVideo, Event, Timeline, Footnote};

export const query = graphql`
  query ($id: String, $lu_id: String) {
    post: file(id: { eq: $id }) {
      childMdx {
        headings {
          value
          depth
        }
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

  const currentIndex = data.chapters.nodes.findIndex((el) => {
    return el.childMdx.frontmatter.order === frontmatter.order;
  });

  const tocItems = data.post.childMdx.headings.map((h,i) => {
    return <li key={`${h.value}-${i}`}>{h.value}</li>;
  });

  const next = data.chapters.nodes[currentIndex + 1];
  const previous = data.chapters.nodes[currentIndex - 1];

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
          {tocItems && (
            <aside className={ChapterStyles.toc}>
              <ol>{tocItems}</ol>
            </aside>
          )}
          <MDXProvider components={shortCodes}>
            <MDXRenderer>{data.post.childMdx.body}</MDXRenderer>
          </MDXProvider>
          <nav className={ChapterStyles.pagination}>
            {next.childMdx.frontmatter.title && (
              <Link className={ChapterStyles.next} to={`../../${next.childMdx.slug}`}>
                <span className={ChapterStyles.paginationLabel}>Next</span>
                <span className={ChapterStyles.paginationTitle}>
                  <Counter n={next.childMdx.frontmatter.order} />
                  {next.childMdx.frontmatter.title}
                </span>
                <p className={ChapterStyles.paginationIntro}>{next.childMdx.frontmatter.intro}</p>
              </Link>
            )}
            {previous && (
              <Link className={ChapterStyles.previous} to={`../../${previous.childMdx.slug}`}>
                <span className={ChapterStyles.paginationLabel}>Previous:</span> <span>{previous.childMdx.frontmatter.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </Base>
  );
};

export default Chapter;
