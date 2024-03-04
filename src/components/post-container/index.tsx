import React, { FC } from 'react'

interface PostContainerProps {
  html: string
  body: string
}

export const PostContainer: FC<PostContainerProps> = ({ html, body , children}) => {
  console.log(children)
  return (
    html ?(<div dangerouslySetInnerHTML={{ __html: html }} />):
    <script>
      {body}
    </script>
  )
}
