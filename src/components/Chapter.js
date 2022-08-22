import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import App from "./App";
import { MDXProvider } from "@mdx-js/react";
import * as ChapterStyles from "./Chapter.module.scss";
import { Quiz, Radio, RadioChoice } from "./Quiz.js";
import { MultipleChoice, Choice } from "./MultipleChoice";
import Quote from "./Quote.js";
import Term from "./Term";
import Figure from "./Figure";
import SiteHeader from "./SiteHeader";
import LectureVideo from "./LectureVideo";
import SiteFooter from "./SiteFooter";
import { Timeline, Event } from "./Timeline";
import useLocalStorage from "./useLocalStorage";
import BookmarkAdded from "../assets/bookmark-added.svg";
import Counter from "./Counter";

const shortCodes = { Quiz, RadioChoice, Choice, Quote, Term, Figure, LectureVideo, Event, Timeline };

export const query = graphql`
  query ($id: String, $lu_id: String) {
    post: file(id: { eq: $id }) {
      childMdx {
        slug
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
          short_title
          order
        }
      }
    }
  }
`;
const Chapter = ({ data, children }) => {
  const frontmatter = data.post.childMdx.frontmatter;
  const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", []);

  const currentIndex = data.chapters.nodes.findIndex((el) => {
    return el.childMdx.frontmatter.order === frontmatter.order;
  });

  const next = data.chapters.nodes[currentIndex + 1];
  const previous = data.chapters.nodes[currentIndex - 1];
  const bookmarkIndex = bookmarks.findIndex((el) => {
    return el.slug === data.post.childMdx.slug;
  });

  function handlePrint() {
    window.print();
  }

  function toggleBookmark() {
    setBookmarks((prevBookmarks) => {
      if (bookmarkIndex === -1) {
        const bookmark = {
          eyebrow: `Unit ${data.unit.childMdx.frontmatter.order}`,
          title: frontmatter.title,
          slug: data.post.childMdx.slug,
        };
        return [...prevBookmarks, bookmark];
      } else {
        return prevBookmarks.filter((el) => {
          return el.slug !== data.post.childMdx.slug;
        });
      }
    });
    console.log(bookmarks);
  }

  return (
    <App>
      <SiteHeader bookmarks={bookmarks} unit={data.unit.childMdx.frontmatter.order} chapter={frontmatter.title} />
      <article>
        <header className={ChapterStyles.header}>
          <Link className={ChapterStyles.unit} to={`../../${data.unit.childMdx.slug}`}>
            <span>Unit {data.unit.childMdx.frontmatter.order}</span>
          </Link>
          <h1 className={ChapterStyles.title}>{frontmatter.title}</h1>
          <p className={ChapterStyles.intro}>{frontmatter.intro}</p>
          <aside className={ChapterStyles.actions}>
            <ul>
              <li>
                <button onClick={handlePrint}>Print</button>
              </li>
              <li>
                <button href="#1">Share</button>
              </li>
              <li>
                <button className={bookmarkIndex === -1 ? ChapterStyles.saveButton : ChapterStyles.saveButtonActive} onClick={toggleBookmark}>
                  {bookmarkIndex === -1 ? (
                    <>Save to bookmarks</>
                  ) : (
                    <>
                      <img alt="" src={BookmarkAdded} /> Saved
                    </>
                  )}
                </button>
              </li>
            </ul>
          </aside>
        </header>
        <div className={ChapterStyles.body}>
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
                <p>{next.childMdx.frontmatter.intro}</p>
              </Link>
            )}
            {previous && (
              <>
                <span className={ChapterStyles.paginationLabel}>Previous</span>
                <Link className={ChapterStyles.previous} to={`../../${previous.childMdx.slug}`}>
                  <span>{previous.childMdx.frontmatter.title}</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </article>
      <SiteFooter />
    </App>
  );
};

export function Head({ data }) {
  const chapter = data.post.childMdx.frontmatter;
  const unit = data.unit.childMdx.frontmatter;
  return (
    <>
      <title>
        {chapter.title} – {unit.title}
      </title>
      <meta name="description" content={chapter.intro} />
    </>
  );
}

export default Chapter;
