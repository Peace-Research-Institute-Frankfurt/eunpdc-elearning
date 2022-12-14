import { Link } from "gatsby";
import * as React from "react";
import { graphql } from "gatsby";
import { SearchForm } from "../components/SearchFrom";

export const query = graphql`
  query {
    site: site {
      siteMetadata {
        title
      }
    }
    units: allFile(
      filter: { extension: { eq: "mdx" }, name: { eq: "index" }, sourceInstanceName: { eq: "luContent" } }
      sort: { childMdx: { frontmatter: { order: ASC } } }
    ) {
      nodes {
        id
        childMdx {
          fields {
            slug
          }
          frontmatter {
            title
            order
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const units = data.units.nodes.map((node, i) => {
    return (
      <li key={`unit-${i}`}>
        <Link to={node.childMdx.fields.slug}>
          {node.childMdx.frontmatter.order}. {node.childMdx.frontmatter.title}
        </Link>
      </li>
    );
  });

  return (
    <main>
      <h1>EUNPDC</h1>
      <SearchForm />
      <div>{units}</div>
    </main>
  );
};
export const Head = ({ data }) => <title>{data.site.siteMetadata.title}</title>;
export default IndexPage;
