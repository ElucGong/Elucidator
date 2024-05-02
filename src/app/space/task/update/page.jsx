import { auth } from '@/lib/auth'
import { getTaskById, getUserById } from '@/lib/data'
import React from 'react'
import styles from './taskUpdate.module.css'
import SpaceTaskForm from '@/components/form/spaceTaskForm/SpaceTaskForm'
import { updateTask } from '@/lib/action'

const SpaceTaskUpdatePage = async ({ searchParams }) => {
  const session = await auth()
  const user = await getUserById(session.user.id)
  const { id } = searchParams
  const task = await getTaskById(id)

  if(!task)
    throw new Error("任务不存在或已删除！")

  if(session.user.id != task.uid)
    throw new Error("非法行为：这不是你创建的任务！")

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SpaceTaskForm
          user={user}
          task={task}
          action={updateTask}
        />
      </div>
    </div>
  )
}

export default SpaceTaskUpdatePage