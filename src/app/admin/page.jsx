import React from 'react'
import styles from './admin.module.css'
import MyPagination from '@/components/pagination/MyPagination'
import { getPost, getTask, getUser } from '@/lib/data'
import TaskCardSmall from '@/components/taskCard/smalll/TaskCardSmall'
import PostCardSmall from '@/components/postCard/small/PostCardSmall'
import UserCardSmall from '@/components/userCard/small/UserCardSmall'
import SearchbarAdmin from '@/components/searchbar/searchbarAdmin/SearchbarAdmin'

const AdminPage = async ({ searchParams }) => {
  let { type, value, page, size } = searchParams
  
  type = type || "user"
  value = value || ''
  page = page || 1
  size = size || 10

  let pageInfo
  if (type == "user")
    pageInfo = await getUser(value, page, size)
  else if (type == "task")
    pageInfo = await getTask(value, page, size)
  else if (type == "post")
    pageInfo = await getPost(value, page, size)

  const { total, list, pageNum } = pageInfo

  const renderContent = () => {
    if (type == "task") {
      return (
        total ? (
          list.map(task =>
            <div className={styles.post} key={task.id}>
              <TaskCardSmall task={task} action={true}/>
            </div>
          )) :
          <div>抱歉，没有搜索到相关任务</div>
      )
    } else if(type == 'post'){
      return (
        total ? (
          list.map(post =>
            <div className={styles.post} key={post.id}>
              <PostCardSmall post={post} action={true}/>
            </div>
          )) :
          <div>抱歉，没有搜索到相关打卡</div>
      )
    } else {
      return (
        total ? (
          list.map(user =>
            <div className={styles.post} key={user.id}>
              <UserCardSmall user={user} action={true}/>
            </div>
          )) :
          <div>抱歉，没有搜索到相关用户</div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>您好，管理员！</h1>
      </div>
      <div className={styles.bottom}>
        <SearchbarAdmin />
        <div className={styles.content}>
          {renderContent()}
        </div>
        <MyPagination
          total={total}
          current={pageNum}
          type={type}
          value={value}
          size={size}
          caller="admin"
        />
      </div>
    </div>
  )
}

export default AdminPage

export const metadata = {
  title: "管理员"
}