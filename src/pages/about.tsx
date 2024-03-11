import React from 'react'
import Resume from '/content/__about/resume.mdx'
import { rhythm } from '../utils/typography'

export default function About () {
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(0.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
          3 / 4
        )}`,
      }}
    >
      <Resume />
    </div>
  )
}