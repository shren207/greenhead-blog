import { Link, useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { TARGET_CLASS } from '../../utils/visible';
import './index.scss';

// img 파일의 크기는 150px * 150px
export const ThumbnailItem = ({ node }) => {
  const result = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "assets" }
          relativePath: { regex: "/thumbnails//" }
        }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(width: 150, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `);

  const image = result.allFile.edges.find(
    (edge) =>
      edge.node.relativePath ===
      `thumbnails/${node.frontmatter.thumbnail.toLowerCase()}.png`
  );
  const imageData = getImage(image.node.childImageSharp.gatsbyImageData);

  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div className="container" key={node.fields.slug}>
        <div>
          <div className="metadatas">
            <span className="tag">{node.frontmatter.category}</span>
            <span className="date">{node.frontmatter.date}</span>
          </div>
          <h3>{node.frontmatter.title || node.fields.slug}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
          />
        </div>
        {node.frontmatter.thumbnail ? (
          <div className="imageWrapper">
            <GatsbyImage
              className="gatsby-image"
              image={imageData}
              objectFit="contain"
              alt="thumbnail"
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
};
