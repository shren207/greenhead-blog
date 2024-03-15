import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

interface CalloutProps {
  variant: 'normal' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({variant = 'normal', children}) => {

  return (
   <div className={cx({ container: true, [variant]: true})}>
     {children}
   </div>
  )
}
