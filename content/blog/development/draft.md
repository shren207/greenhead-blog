---
title: 'Draft'
date: 2019-1-3 16:21:13
category: 'development'
draft: true
img: false
---

Draft Post

draft값이 true이면 dummy post로 쓰겠다는 뜻이며, 이경우 **display: none**과 비슷하게
이 포스트는 블로그에선 보이지 않는다.

```graphql
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        comment {
          disqusShortName
          utterances
        }
        sponsor {
          buyMeACoffeeId
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
```

draft post가 있어야 하는 이유는 _query를 위 코드와 같이 지정해 놓았다 할 지라도, post 중 어느 하나도 해당 쿼리를 사용하지 않는 경우 에러가 뜬다._ 이를 방지하기 위해 draft를 쓰는 것 같다.
나의 경우에는 원래 template에는 없었던 쿼리인 description, img를 추가해서 쓰고 있는데 처음엔 이 내용을 몰랐기 때문에 너무나 많이 헤맸다...

그리고 dummy를 추가할 때도 ㄱㅇㅗㅗㅗ;ㄴㅇㅎㅁㄴㄴㄴㅇㄹㄴㅇㄹㄴㄴㅇㄴㅇㅇㅇㄴㅇㄴㄴㄴㅇㄴㅇㄴ

```
description
img
```

이런식으로 하는게 아닌

```
description: blahblah
img: boolean
```

이런식으로 작성해야 에러가 발생하지 않는다.

---

### 네비게이터 이슈

네비게이터가 작동하지 않는 이유를 알았다. netlify의 NODE_VERSION을 나는 v14.18.2로 해 놨었는데, 그냥14라고 하니까 고칠 수 있었다.

### npm run post 할때 포스트 default 값 설정하는 법

node_modules/gatsby-post-gen/lib/index.js 파일에서 contents 변수를 수정하면 된다.
