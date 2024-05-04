import { auth } from '@/lib/auth'
import { getUserById } from '@/lib/data'
import React from 'react'
import styles from './taskCreate.module.css'
import SpaceTaskForm from '@/components/form/spaceTaskForm/SpaceTaskForm'
import { createTask } from '@/lib/action'

const SpaceTaskCreatePage = async () => {
  const session = await auth()
  const user = await getUserById(session.user.id)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SpaceTaskForm
          user={user}
          task={null}
          action={createTask}
        />
      </div>
    </div>
  )
}

export default SpaceTaskCreatePage

export const metadata = {
  title: "创建任务"
}