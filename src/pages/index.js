import { useMemo } from 'react';
import { graphql } from 'gatsby';
import _ from 'lodash';
import { Bio } from '../components/bio';
import { Category } from '../components/category';
import { Contents } from '../components/contents';
import { Head } from '../components/head';
import { HOME_TITLE } from '../constants';
import { useCategory } from '../hooks/useCategory';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useRenderedCount } from '../hooks/useRenderedCount';
import { useScrollEvent } from '../hooks/useScrollEvent';
import { Layout } from '../layout';
import * as Dom from '../utils/dom';
import * as EventManager from '../utils/event-manager';

const BASE_LINE = 80;

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos;
}

export default function Pages({ data, location }) {
  const { siteMetadata } = data.site;
  const { countOfInitialPost } = siteMetadata.configs;

  const posts = data.allMdx.edges;

  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    []
  );
  const [count, countRef, increaseCount] = useRenderedCount();
  const [category, selectCategory] = useCategory();

  useIntersectionObserver();
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight;
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE;
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost;

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })();
  });

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <Bio />
      <Category
        categories={categories}
        category={category}
        selectCategory={selectCategory}
      />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        category={category}
      />
    </Layout>
  );
}

//! 수정한 query: data(년-월-일), excerpt(prunLength: 200 -> 90) // 미리보기 글자 수
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            category
            draft
            thumbnail
            description
          }
        }
      }
    }
  }
`;
