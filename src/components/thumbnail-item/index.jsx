import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import './index.scss'

// img 파일의 크기는 150px * 150px
export const ThumbnailItem = ({ node }) => {
  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div className={`container`} key={node.fields.slug}>
        <div>
          <span className={`tag`}>{node.frontmatter.category}</span>
          <span className={`date`}>{node.frontmatter.date}</span>
          <h3>{node.frontmatter.title || node.fields.slug}</h3>
          <p dangerouslySetInnerHTML={{ __html: node.frontmatter.description || node.excerpt }} />
        </div>
        {node.frontmatter.thumbnail ? (
          <img
            src={require(`./images/${node.frontmatter.thumbnail.toLowerCase()}.png`)}
            alt="HTML"
          />
        ) : null}
      </div>
    </Link>
  )
}
