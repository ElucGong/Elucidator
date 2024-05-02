import React from 'react'
import styles from './task.module.css'
import { getFollow, getPostByTask, getTaskById, getUserById } from '@/lib/data'
import Image from 'next/image'
import UserCardSmall from '@/components/userCard/small/UserCardSmall'
import FollowButton from '@/components/button/FollowButton'
import { auth } from '@/lib/auth'
import { Button } from 'antd'
import PostCardLarge from '@/components/postCard/large/PostCardLarge'
import SearchbarTask from '@/components/searchbar/searchbarTask/SearchbarTask'
import MyPagination from '@/components/pagination/MyPagination'

const TaskPage = async ({ params, searchParams }) => {
  const { slug } = params
  const id = slug.split('-')[1]
  const task = await getTaskById(id)

  if(!task)
    throw new Error("任务不存在或已删除！")

  const user = await getUserById(task.uid)
  const session = await auth()
  let { value, page, size } = searchParams

  value = value || ''
  page = page || 1
  size = size || 12

  const renderMedia = () => {
    if (task.media.endsWith(".mp4")) {
      return (
        <video controls autoPlay className={styles.video}>
          <source src={`${task.media}`} type="video/mp4" />
          您的浏览器不支持视频标签。
        </video>
      )
    } else {
      return <Image src={`${task.media}`} alt="" fill className={styles.img} />
    }
  }

  let follow, logged = false
  if (session?.user) {
    logged = true
    follow = await getFollow(session.user.id, id)
  }

  const pageInfo = await getPostByTask(id, value, page, size)
  const { total, list, pageNum } = pageInfo

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={styles.contentTop}>
            <div className={styles.title}>
              {task.title}
            </div>
            <div className={styles.time}>
              {task.createdAt}
            </div>
          </div>
          <div className={styles.media}>
            {renderMedia()}
          </div>
          <div className={styles.contentBottom}>
            {task.description}
          </div>
        </div>
        <span>该任务下的打卡</span>
        <div className={styles.display}>
          <SearchbarTask />
          <div className={styles.postContainer}>
            {
              total ? (
                list.map(post =>
                  <div className={styles.post} key={post.id}>
                    <PostCardLarge post={post} />
                  </div>
                )) :
                <div>抱歉，没有搜索到相关打卡</div>
            }
          </div>
          <MyPagination
            total={total}
            current={pageNum}
            value={value}
            size={size}
            caller="task"
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <UserCardSmall user={user} />
          <div>
            {task.state == 'open' ? '该任务处于开启状态' : '该任务已关闭'}
          </div>
          <div className={styles.action}>
            <FollowButton tid={id} uid={session?.user.id} follow={follow} logged={logged} />
            {
              task.state == 'open'
                ? (
                  <Button
                    type='primary'
                    href={logged ? `/space/post/create?tid=${id}` : '/login'}
                  >
                    发布打卡
                  </Button>
                ) : (
                  <Button disabled>发布打卡</Button>
                )
            }

          </div>
        </div>
        <div className={styles.comment}>
          评论区
        </div>
      </div>
    </div>
  )
}

export default TaskPage

export async function generateMetadata({ params }) {
 
  return {
    title: decodeURI(params.slug.split('-')[0])
  }
}