import { auth } from '@/lib/auth'
import { getTaskById, getUserById } from '@/lib/data'
import React from 'react'
import styles from './postCreate.module.css'
import SpacePostForm from '@/components/form/spacePostForm/SpacePostForm'
import { createPost } from '@/lib/action'

const SpacePostCreatePage = async ({ searchParams }) => {
  const session = await auth()
  const user = await getUserById(session.user.id)
  const { tid } = searchParams
  const task = await getTaskById(tid)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SpacePostForm
          user={user}
          task={task}
          post={null}
          action={createPost}
        />
      </div>
    </div>
  )
}

export default SpacePostCreatePage