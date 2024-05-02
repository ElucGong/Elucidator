import React from 'react'
import styles from './space.module.css'
import UserCardLarge from '@/components/userCard/large/UserCardLarge'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import SearchbarSpace from '@/components/searchbar/searchbarSpace/SearchbarSpace'
import MyPagination from '@/components/pagination/MyPagination'
import { getUserById, getTaskByUser, getPostByUser, getTaskByFollow } from '@/lib/data'
import TaskCardSmall from '@/components/taskCard/smalll/TaskCardSmall'
import PostCardSmall from '@/components/postCard/small/PostCardSmall'

const SpacePage = async ({ searchParams }) => {
  const session = await auth()
  const user = await getUserById(session.user.id)
  let { type, value, page, size } = searchParams

  type = type || "task"
  value = value || ''
  page = page || 1
  size = size || 10

  let pageInfo
  if (type == "task")
    pageInfo = await getTaskByUser(user.id, value, page, size)
  else if (type == "follow")
    pageInfo = await getTaskByFollow(user.id, value, page, size)
  else if (type == "post")
    pageInfo = await getPostByUser(user.id, value, page, size)

  const { total, list, pageNum } = pageInfo

  const renderContent = () => {
    if (type == "task" || type == "follow") {
      return (
        total ? (
          list.map(task =>
            <div className={styles.post} key={task.id}>
              <TaskCardSmall task={task} action={true}/>
            </div>
          )) :
          <div>抱歉，没有搜索到相关任务</div>
      )
    } else {
      return (
        total ? (
          list.map(post =>
            <div className={styles.post} key={post.id}>
              <PostCardSmall post={post} action={true}/>
            </div>
          )) :
          <div>抱歉，没有搜索到相关打卡</div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <UserCardLarge user={user} />
        </div>
        <div className={styles.topAction}>
          <Link href={'/space/info'} className={styles.button}>修改信息</Link>
          <Link href={'/space/task/create'} className={styles.button}>发布任务</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <SearchbarSpace />
        <div className={styles.content}>
          {renderContent()}
        </div>
        <MyPagination
          total={total}
          current={pageNum}
          type={type}
          value={value}
          size={size}
          caller="user"
        />
      </div>
    </div>
  )
}

export default SpacePage

export const metadata = {
  title: "个人空间"
}