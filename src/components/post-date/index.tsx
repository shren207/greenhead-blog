import React, { FC } from 'react'
import styles from './index.module.scss'

interface PostDateProps {
  date: string
}

export const PostDate: FC<PostDateProps> = ({ date }) => {
  return <p className={styles.postDate}>{date}</p>
}
