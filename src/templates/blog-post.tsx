import { useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Bio } from '../components/bio';
import * as Elements from '../components/elements';
import { Head } from '../components/head';
import { Callout } from '../components/mdx/callout';
import { PostDate } from '../components/post-date';
import { PostNavigator } from '../components/post-navigator';
import { PostTitle } from '../components/post-title';
import { Utterances } from '../components/utterances';
import { Layout } from '../layout';
import * as ScrollManager from '../utils/scroll';
import type { ReactNode } from 'react';
import '../styles/code.scss';
import 'katex/dist/katex.min.css';

const shortcodes = { Link, Callout };

interface PageTemplateProps {
  pageContext: any;
  location: Location;
  children: ReactNode;
}

export default function PageTemplate({
  pageContext,
  location,
  children,
}: PageTemplateProps) {
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

  const post = pageContext.frontmatter;
  const metaData = queryForSiteMetaData.site.siteMetadata;
  const { title, comment } = metaData;
  const { utterances } = comment;
  const { title: postTitle, date } = post;

  useEffect(() => {
    ScrollManager.init();
    return () => {
      ScrollManager.destroy();
    };
  }, []);

  return (
    <Layout location={location} title={title}>
      <Head title={postTitle} description={post.excerpt} />
      <PostTitle title={postTitle} />
      <PostDate date={date} />
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
      <Elements.Hr />
      <Bio />
      <PostNavigator pageContext={pageContext} />
      {!!utterances && <Utterances repo={utterances} />}
    </Layout>
  );
}
