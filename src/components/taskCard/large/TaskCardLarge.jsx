import React from 'react'
import styles from './taskCardLarge.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getUserById } from '@/lib/data'

const TaskCardLarge = async ({ task }) => {
  const user = await getUserById(task.uid)
  const date = task.createdAt.split(" ")[0]

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={`${task.cover}`} alt="" fill className={styles.img} />
      </div>
      <div className={styles.title}>
        <Link href={`/task/${task.title}-${task.id}`} className={styles.link}>{task.title}</Link>
      </div>
      <div className={styles.bottom}>
        <span className={styles.username}>{user.name}</span>
        <span>&nbsp;·&nbsp;</span>
        <span>{date}</span>
      </div>
    </div>
  )
}

export default TaskCardLarge