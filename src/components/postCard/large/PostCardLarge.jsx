import React from 'react'
import styles from './postCardLarge.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getUserById } from '@/lib/data'

const PostCardLarge = async ({ post }) => {
  const user = await getUserById(post.uid)
  const date = post.createdAt.split(" ")[0]

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={`${post.cover}`} alt="" fill className={styles.img} />
      </div>
      <div className={styles.title}>
        <Link href={`/post/${post.title}-${post.id}`} className={styles.link}>{post.title}</Link>
      </div>
      <div className={styles.bottom}>
        <span className={styles.username}>{user.name}</span>
        <span>&nbsp;·&nbsp;</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

export default PostCardLarge