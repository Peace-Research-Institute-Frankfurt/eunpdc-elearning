import React from "react";
import { graphql, Link } from "gatsby";
import App from "./App";
import { MDXProvider } from "@mdx-js/react";
import * as ChapterStyles from "./Chapter.module.scss";
import { Quiz, RadioChoice, Question } from "./Quiz.js";
import { Choice } from "./MultipleChoice";
import Quote from "./Quote.js";
import Term from "./Term";
import Figure from "./Figure";
import SiteHeader from "./SiteHeader";
import LectureVideo from "./LectureVideo";
import SiteFooter from "./SiteFooter";
import { Timeline, Event } from "./Timeline";
import { Tabs, Tab } from "./Tabs";
import useLocalStorage from "./useLocalStorage";
import BookmarkAdded from "../assets/bookmark-added.svg";
import Counter from "./Counter";
import { FlipCards, Card } from "./FlipCards";
import { Details } from "./Details";

const shortCodes = { Quiz, RadioChoice, Question, Choice, Quote, Term, Figure, LectureVideo, Event, Timeline, FlipCards, Card, Details, Tabs, Tab };

export const query = graphql`
  query ($id: String, $lu_id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
    post: file(id: { eq: $id }) {
      childMdx {
        fields {
          slug
        }
        frontmatter {
          title
          intro
          order
        }
        tableOfContents
      }
    }
    chapters: allFile(
      filter: { relativeDirectory: { eq: $lu_id }, name: { ne: "index" }, ext: { eq: ".mdx" } }
      sort: { fields: childMdx___frontmatter___order }
    ) {
      nodes {
        name
        childMdx {
          fields {
            slug
          }
          frontmatter {
            title
            intro
            order
          }
        }
      }
    }
    unit: file(name: { eq: "index" }, relativeDirectory: { eq: $lu_id }) {
      name
      childMdx {
        fields {
          slug
        }
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

  const actions = (
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
  );

  function handlePrint() {
    window.print();
  }

  const tocItems = data.post.childMdx.tableOfContents.items.map((h) => {
    return (
      <li>
        <a href={h.url}>{h.title}</a>
      </li>
    );
  });

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
  }

  return (
    <App>
      <SiteHeader bookmarks={bookmarks} unit={data.unit.childMdx.frontmatter.order} chapter={frontmatter.title} />
      <article>
        <header className={ChapterStyles.header}>
          <Link className={ChapterStyles.unit} to={`../`}>
            Unit {data.unit.childMdx.frontmatter.order}
          </Link>
          <h1 className={ChapterStyles.title}>{frontmatter.title}</h1>
          {frontmatter.intro && <p className={ChapterStyles.intro}>{frontmatter.intro}</p>}
          {tocItems.length > 1 && <ol className={ChapterStyles.tocContainer}>{tocItems}</ol>}
        </header>
        <div className={ChapterStyles.body}>
          <div className={ChapterStyles.bodyText}>
            <MDXProvider components={shortCodes}>{children}</MDXProvider>
          </div>
          <nav className={ChapterStyles.pagination}>
            {next && next.childMdx.frontmatter.title && (
              <Link className={ChapterStyles.next} to={`../..${next.childMdx.fields.slug}`}>
                <span className={ChapterStyles.paginationLabel}>Next</span>
                <span className={ChapterStyles.paginationTitle}>
                  {next.childMdx.frontmatter.order}. {next.childMdx.frontmatter.title}
                </span>
                {next.childMdx.frontmatter.intro && <p className={ChapterStyles.paginationIntro}>{next.childMdx.frontmatter.intro}</p>}
              </Link>
            )}
            {previous && (
              <>
                <span className={ChapterStyles.paginationLabel}>Previous</span>
                <Link className={ChapterStyles.previous} to={`../..${previous.childMdx.fields.slug}`}>
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
