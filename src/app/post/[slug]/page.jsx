import React from 'react'
import styles from './post.module.css'
import { getPostById, getTaskById, getUserById } from '@/lib/data'
import Image from 'next/image'
import TaskCardSmall from '@/components/taskCard/smalll/TaskCardSmall'
import UserCardSmall from '@/components/userCard/small/UserCardSmall'

const PostPage = async ({ params }) => {
  const { slug } = params
  const id = slug.split('-')[1]
  const post = await getPostById(id)
  const user = await getUserById(post.uid)

  if (!post)
    throw new Error("打卡不存在或已删除！")

  const task = await getTaskById(post.tid)

  const renderMedia = () => {
    if (post.media.endsWith(".mp4")) {
      return (
        <video controls autoPlay className={styles.video}>
          <source src={`${post.media}`} type="video/mp4" />
          您的浏览器不支持视频标签。
        </video>
      )
    } else {
      return <Image src={`${post.media}`} alt="" fill className={styles.img} />
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={styles.contentTop}>
            <div className={styles.title}>
              {post.title}
            </div>
            <div className={styles.time}>
              {post.createdAt}
            </div>
          </div>
          <div className={styles.media}>
            {renderMedia()}
          </div>
          <div className={styles.contentBottom}>
            {post.description}
          </div>
        </div>
        <div className={styles.comment}>
          评论区
        </div>
      </div>
      <div className={styles.right}>
        <UserCardSmall user={user} />
        {
          task ? <TaskCardSmall task={task} /> : '该打卡对应的任务已删除'
        }
      </div>
    </div>
  )
}

export default PostPage

export async function generateMetadata({ params }) {
 
  return {
    title: decodeURI(params.slug.split('-')[0])
  }
}