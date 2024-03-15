import { memo } from 'react';
import type { ReactNode, FC } from 'react';

import './index.scss';

interface ThumbnailContainerProps {
  children: ReactNode;
}

export const ThumbnailContainer: FC<ThumbnailContainerProps> = memo(
  ({ children }) => <div className="thumbnail-container">{children}</div>
);
