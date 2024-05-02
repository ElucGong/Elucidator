import { auth } from '@/lib/auth'
import { getPostById, getTaskById, getUserById } from '@/lib/data'
import React from 'react'
import styles from './postUpdate.module.css'
import SpacePostForm from '@/components/form/spacePostForm/SpacePostForm'
import { updatePost } from '@/lib/action'
import TaskCardSmall from '@/components/taskCard/smalll/TaskCardSmall'

const SpacePostUpdatePage = async ({ searchParams }) => {
  const session = await auth()
  const user = await getUserById(session.user.id)
  const { id } = searchParams
  const post = await getPostById(id)
  const task = await getTaskById(post.tid)

  if(!post)
    throw new Error("打卡不存在或已删除！")

  if(!task)
    throw new Error("打卡对应的任务不存在或已删除！")

  if(session.user.id != post.uid)
    throw new Error("非法行为：这不是你创建的打卡！")

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <div>任务</div>
        <div className={styles.taskCard}>
          <TaskCardSmall task={task} action={false} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <SpacePostForm
          user={user}
          task={task}
          post={post}
          action={updatePost}
        />
      </div>
    </div>
  )
}

export default SpacePostUpdatePage