import React, { FC } from 'react'

interface PostContainerProps {
  html: string
}

export const PostContainer: FC<PostContainerProps> = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
)
