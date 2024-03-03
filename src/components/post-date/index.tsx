import React, { FC } from 'react'
import './index.scss'

interface PostDateProps {
  date: string
}

export const PostDate: FC<PostDateProps> = ({ date }) => {
  return <p className="post-date">{date}</p>
}
