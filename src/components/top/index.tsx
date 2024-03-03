import React, { FC } from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import './index.scss'

interface TopProps {
  title: string
  location: Location
  rootPath: string
}

export const Top: FC<TopProps> = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}
      <GitHubIcon />
    </div>
  )
}
