import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import './index.scss'

export const ThumbnailItem = ({ node }) => {
  // console.log(node) 여기로 오는 frontmatter의 값을 확인할 수 있다.
  // 필요한 경우 '../../pages/index.js' 이 파일의 frontmatter를 수정하자
  // img 파일의 크기는 150px * 150px
  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div className={`container`} key={node.fields.slug}>
        <div>
          <span className={`tag`}>{node.frontmatter.category}</span>
          <span className={`date`}>{node.frontmatter.date}</span>
          <h3>{node.frontmatter.title || node.fields.slug}</h3>
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
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
