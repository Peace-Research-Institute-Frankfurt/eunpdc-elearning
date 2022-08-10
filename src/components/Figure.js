import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as FigureStyles from "./Figure.module.scss";
import React from "react";

export default function Figure(props) {
  const data = useStaticQuery(graphql`
    query ImageQuery {
      images: allFile {
        nodes {
          relativePath
          base
          name
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  `);

  // Let's find our image
  let image = null;
  data.images.nodes.forEach((img) => {
    if (img.base === props.src) {
      image = img;
    }
  });
  const thisImage = getImage(image);
  let size = props.size;
  return (
    <figure className={[FigureStyles[size], FigureStyles.container].join(" ")}>
      <GatsbyImage className={FigureStyles.image} image={thisImage} alt={props.alt}></GatsbyImage>
      <figcaption className={FigureStyles.caption}>
        <span>{props.caption}</span>
        <span className={FigureStyles.credit}>{props.credit}</span>
      </figcaption>
    </figure>
  );
}
