import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import './index.scss';

export const Bio = () => {
  const data = useStaticQuery(bioQuery);
  const { author, social, introduction } = data.site.siteMetadata;
  const imageData = getImage(data.avatar.childImageSharp.gatsbyImageData);

  return (
    <div className="bio">
      <div className="author">
        <div className="author-description">
          <GatsbyImage
            className="author-image" // gatsby-image-wrapper에 적용하는 스타일이다.
            image={imageData}
            alt={author}
            objectFit="contain"
          />
          <div className="author-name">
            <div className="metadatas">
              <span className="author-name-prefix">Written by</span>
              {/*! resume 영역*/}
              {/*<Link to="/about" className="author-name-content">*/}
              <span className="author-name-content">@{author}</span>
              {/*</Link>*/}
            </div>
            <div className="author-introduction">{introduction}</div>
            <p className="author-socials">
              {social.instagram && (
                <a href={`https://www.instagram.com/${social.instagram}`}>
                  Instagram
                </a>
              )}
              {social.github && (
                <a href={`https://github.com/${social.github}`}>GitHub</a>
              )}
              {social.medium && (
                <a href={`https://medium.com/${social.medium}`}>Medium</a>
              )}
              {social.twitter && (
                <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
              )}
              {social.facebook && (
                <a href={`https://www.facebook.com/${social.facebook}`}>
                  Facebook
                </a>
              )}
              {social.linkedin && (
                <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
                  LinkedIn
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        gatsbyImageData(width: 72, height: 72, layout: CONSTRAINED)
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
          github
          medium
          facebook
          linkedin
          instagram
        }
      }
    }
  }
`;
