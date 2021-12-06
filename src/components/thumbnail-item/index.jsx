import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
// import img from './images/JS.png'
import './index.scss'

export const ThumbnailItem = ({ node }) => {
  console.log(node) //* 여기로 오는 frontmatter의 값을 확인할 수 있다.
  // 필요한 경우 '../../pages/index.js' 이 파일의 frontmatter를 수정하자
  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div className={`container`} key={node.fields.slug}>
        <div>
          <span className={`tag`}>{node.frontmatter.category}</span>
          <span className={`date`}>{node.frontmatter.date}</span>
          <h3>{node.frontmatter.title || node.fields.slug}</h3>
          {/* <p dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
          {/* 만약 미리보기를 없애고 본문의 내용중 일부를 보이게 하고 싶다면(기본값), 위 주석을 해제하고 아래 코드를 주석처리하자 */}
          <p>{node.frontmatter.description}</p>
        </div>
        {node.frontmatter.img ? (
          <img
            src={require(`./images/${node.frontmatter.category}.png`)}
            alt="HTML"
          />
        ) : null}
      </div>
    </Link>
  )
}
