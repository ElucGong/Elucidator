"use client"

import React, { useState } from 'react'
import styles from './links.module.css'
import Navlink from './navlink/Navlink'
import { logout } from '@/lib/action'

const links = [
  {
    title: "首页",
    path: "/"
  },
  {
    title: "发现",
    path: "/explore"
  },
  {
    title: "我的",
    path: "/space"
  },
]

const Links = ({ session }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map(link => <Navlink item={link} key={link.title} />)}
        {
          session?.user ?
            <>
              {session.user?.isAdmin && <Navlink item={{ title: "管理员", path: "/admin" }} />}
              <form action={logout}>
                <button className={styles.logout}>退出登录</button>
              </form>
            </>
            :
            <Navlink item={{ title: "登录", path: "/login" }} />
        }
      </div>
      <button className={styles.menuButton} onClick={() => setOpen(!open)}>Menu</button>
      {
        open &&
        <div className={styles.mobileLinks}>
          {links.map(link => <Navlink item={link} key={link.title} />)}
        </div>
      }
    </div>
  )
}

export default Links