import React from 'react'
import styles from 'styles/components/Layout.module.scss'

const Layout: React.FC = ({ children }) => {
  return <div className={styles.LayoutWrapper}>{children}</div>
}

export default Layout
