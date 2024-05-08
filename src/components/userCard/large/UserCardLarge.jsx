import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import styles from './userCardLarge.module.css'
import Image from 'next/image'
import Link from 'next/link'

const UserCardLarge = ({ user }) => {
  const renderAvatar = () => {
    if (user.avatar == 'origin')
      return <UserOutlined />
    else
      return <Image src={`${user.avatar}`} alt="" fill sizes="10vw"/>
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Avatar size={80} icon={renderAvatar()} />
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
  )
}

export default UserCardLarge