import React, { ReactNode, memo } from 'react'

import './index.scss'

interface ThumbnailContainerProps {
  children: ReactNode
}

export const ThumbnailContainer: React.FC<ThumbnailContainerProps> = memo(({ children }) => (
  <div className="thumbnail-container">{children}</div>
));
