import * as React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

export const query = graphql`
  query {
    units: allFile(filter: { extension: { eq: "mdx" }, name: {eq: "index"}, sourceInstanceName: { eq: "luContent" } }) {
      nodes {
        id
        childMdx {
          slug
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const units = data.units.nodes.map((node) => {
    return (
      <li >
        <Link to={node.childMdx.slug}>{node.childMdx.frontmatter.title}</Link>
      </li>
    );
  });

  return (
    <main>
      <h1>EUNPDC</h1>
      <div>{units}</div>
    </main>
  );
};

export default IndexPage;
