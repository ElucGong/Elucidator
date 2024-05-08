import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import styles from './userCardSmall.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ActiveButton from '@/components/button/ActiveButton'
import { auth } from '@/lib/auth'

const UserCardSmall = async ({ user, action }) => {
  const session = await auth()

  const renderAvatar = () => {
    if (user.avatar == 'origin')
      return <UserOutlined />
    else
      return <Image src={`${user.avatar}`} alt="" fill sizes="10vw" />
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.left}>
          <Avatar size={60} icon={renderAvatar()} />
        </div>
        <div className={styles.right}>
          <div className={styles.name}>
            <Link href={`/user/${user.name}-${user.id}`} className={styles.link}>{user.name}</Link>
          </div>
          <div className={styles.description}>
            {user.description}
          </div>
        </div>
      </div>
      {
        action && session.user.isAdmin && session.user.id != user.id && (
          <div className={styles.action}>
            <ActiveButton user={user}/>
          </div>
        )
      }
    </div>
  )
}

export default UserCardSmall