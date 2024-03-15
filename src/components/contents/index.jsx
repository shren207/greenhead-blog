import { useMemo } from 'react';

import { CATEGORY_TYPE } from '../../constants';
import { ThumbnailContainer } from '../thumbnail-container';
import { ThumbnailItem } from '../thumbnail-item';

export const Contents = ({ posts, countOfInitialPost, count, category }) => {
  const refinedPosts = useMemo(
    () =>
      posts
        .filter(
          ({ node }) =>
            category === CATEGORY_TYPE.ALL ||
            node.frontmatter.category === category
        )
        .slice(0, count * countOfInitialPost),
    [category, count, countOfInitialPost, posts]
  );

  return (
    <ThumbnailContainer>
      {refinedPosts.map(({ node }, index) => (
        <ThumbnailItem node={node} key={`item_${index}`} />
      ))}
    </ThumbnailContainer>
  );
};
