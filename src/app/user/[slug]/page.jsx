import React from 'react'
import styles from './user.module.css'
import UserCardLarge from '@/components/userCard/large/UserCardLarge'
import { getUserById, getTaskByUser, getPostByUser } from '@/lib/data'
import SearchbarUser from '@/components/searchbar/searchbarUser/SearchbarUser'
import TaskCardLarge from '@/components/taskCard/large/TaskCardLarge'
import PostCardLarge from '@/components/postCard/large/PostCardLarge'
import MyPagination from '@/components/pagination/MyPagination'

const UserPage = async ({ params, searchParams }) => {
  const { slug } = params
  const id = slug.split('-')[1]
  const user = await getUserById(id)
  let { type, value, page, size } = searchParams

  type = type || "task"
  value = value || ''
  page = page || 1
  size = size || 16

  let pageInfo
  if (type == "task")
    pageInfo = await getTaskByUser(user.id, value, page, size)
  else if (type == "post")
    pageInfo = await getPostByUser(user.id, value, page, size)

  const { total, list, pageNum } = pageInfo

  const renderContent = () => {
    if (type == "task") {
      return (
        total ? (
          list.map(task =>
            <div className={styles.post} key={task.id}>
              <TaskCardLarge task={task} />
            </div>
          )) :
          <div>抱歉，没有搜索到相关任务</div>
      )
    } else {
      return (
        total ? (
          list.map(post =>
            <div className={styles.post} key={post.id}>
              <PostCardLarge post={post} />
            </div>
          )) :
          <div>抱歉，没有搜索到相关打卡</div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserCardLarge user={user} />
      </div>
      <div className={styles.mid}>
        <SearchbarUser />
      </div>
      <div className={styles.bottom}>
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
  )
}

export default UserPage

export async function generateMetadata({ params }) {
 
  return {
    title: decodeURI(params.slug.split('-')[0])
  }
}