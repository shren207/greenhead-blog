import React, { useEffect } from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import * as Elements from '../components/elements'
import { Layout } from '../layout'
import { Head } from '../components/head'
import { PostTitle } from '../components/post-title'
import { MDXProvider } from "@mdx-js/react"
import { PostDate } from '../components/post-date'
import { Bio } from '../components/bio'
import { PostNavigator } from '../components/post-navigator'
import { Utterances } from '../components/utterances'
import * as ScrollManager from '../utils/scroll'
import '../styles/code.scss'
import 'katex/dist/katex.min.css'

const shortcodes = { Link }

export default function PageTemplate ({  pageContext, location, children }) {
  const queryForSiteMetaData = useStaticQuery(graphql`
      query {
          site {
              siteMetadata {
                  title
                  author
                  siteUrl
                  comment {
                      utterances
                  }
              }
          }
      }
  `);

  const post = pageContext.frontmatter
  const metaData = queryForSiteMetaData.site.siteMetadata;
  const { title, comment } = metaData
  const { utterances } = comment
  const { title: postTitle, date } = post

  useEffect(() => {
    ScrollManager.init()
    return () => ScrollManager.destroy()
  }, [])

  return (
    <Layout location={location} title={title}>
      <Head title={postTitle} description={post.excerpt} />
      <PostTitle title={postTitle} />
      <PostDate date={date} />
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
      <Elements.Hr />
      <Bio />
      <PostNavigator pageContext={pageContext} />
      {!!utterances && <Utterances repo={utterances} />}
    </Layout>
  )
}

// export const pageQuery = graphql`
//   query ($slug: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//         siteUrl
//         comment {
//           utterances
//         }
//       }
//     }
//     mdx(frontmatter: { slug: { eq: $slug } }) {
//       excerpt(pruneLength: 280)
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//       }
//     }
//   }
// `
