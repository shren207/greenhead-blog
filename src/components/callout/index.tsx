import React from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.scss'

const cx = classNames.bind(styles)

interface CalloutProps {
  variant: 'default' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({variant = 'default', children}) => {

  return (
   <div className={cx('container', {[variant]: true})}>
     {children}
   </div>
  )
}
