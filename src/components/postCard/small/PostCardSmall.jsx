import React from 'react'
import styles from './postCardSmall.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getUserById } from '@/lib/data'
import { Button } from 'antd'
import DeleteButton from '@/components/button/DeleteButton'

const PostCardSmall = async ({ post, action }) => {
  const user = await getUserById(post.uid)
  const date = post.createdAt.split(" ")[0]

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.imgContainer}>
          <Image src={`${post.cover}`} alt="" fill className={styles.img} sizes="10vw" />
        </div>
        <div className={styles.infoRight}>
          <div className={styles.title}>
            <Link href={`/post/${post.title}-${post.id}`} className={styles.link}>{post.title}</Link>
          </div>
          <div className={styles.bottom}>
            <span className={styles.username}>{user.name}</span>
            <span>&nbsp;·&nbsp;</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      {
        action && (
          <div className={styles.action}>
            <Button type='primary' href={`/space/post/update?id=${post.id}`}>更新</Button>
            <DeleteButton type='post' id={post.id}/>
          </div>
        )
      }
    </div>
  )
}

export default PostCardSmall