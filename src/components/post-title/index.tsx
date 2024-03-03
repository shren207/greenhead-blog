import React, { FC } from 'react'

interface PostTitleProps {
  title: string
}

export const PostTitle: FC<PostTitleProps> = ({ title }) => <h1>{title}</h1>
