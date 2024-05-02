"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './navlink.module.css'

const Navlink = ({ item }) => {
  const pathName = usePathname()

  return (
    <div>
      <Link
        href={item.path}
        className={`${styles.container} ${item.path == pathName && styles.active}`}
      >
        {item.title}
      </Link>
    </div>
  )
}

export default Navlink