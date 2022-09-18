import { Link } from "gatsby";
import * as React from "react";
import { graphql } from "gatsby";

export const query = graphql`
  query {
    units: allFile(
      filter: { extension: { eq: "mdx" }, name: { eq: "index" }, sourceInstanceName: { eq: "luContent" } }
      sort: { fields: childMdx___frontmatter___order }
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
  const units = data.units.nodes.map((node) => {
    return (
      <li>
        <Link to={node.childMdx.fields.slug}>
          {node.childMdx.frontmatter.order}. {node.childMdx.frontmatter.title}
        </Link>
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
