import React from 'react'
import styles from "./content.module.css"
import PostCardLarge from '@/components/postCard/large/PostCardLarge'
import { getPost, getTask, getUser } from '@/lib/data'
import SearchbarExplore from '@/components/searchbar/searchbarExplore/SearchbarExplore'
import TaskCardLarge from '@/components/taskCard/large/TaskCardLarge'
import UserCardLarge from '@/components/userCard/large/UserCardLarge'
import MyPagination from '@/components/pagination/MyPagination'

const ExploreContentPage = async ({ params, searchParams }) => {
  const { type } = params
  const { value, page, size } = searchParams

  let pageInfo
  if (type == "task")
    pageInfo = await getTask(value, page, size)
  else if (type == "post")
    pageInfo = await getPost(value, page, size)
  else if (type == "user")
    pageInfo = await getUser(value, page, size)

  const { list, total, pageNum } = pageInfo

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
    } else if (type == "post") {
      return (
        total ? (
          list.map(post =>
            <div className={styles.post} key={post.id}>
              <PostCardLarge post={post} />
            </div>
          )) :
          <div>抱歉，没有搜索到相关打卡</div>
      )
    } else {
      return (
        total ? (
          list.map(user =>
            <div className={styles.user} key={user.id}>
              <UserCardLarge user={user} />
            </div>
          )) :
          <div>抱歉，没有搜索到相关用户</div>
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchbarExplore />
      </div>
      <div className={styles.bottom} >
        {renderContent()}
      </div>
      <MyPagination
        total={total}
        current={pageNum}
        type={type}
        value={value}
        size={size}
        caller="explore"
      />
    </div>
  )
}

export default ExploreContentPage

export async function generateMetadata({ params, searchParams }) {
 
  return {
    title: searchParams.value
  }
}