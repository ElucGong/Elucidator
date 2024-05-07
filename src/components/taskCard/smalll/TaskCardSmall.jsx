import React from 'react'
import styles from './taskCardSmall.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getUserById } from '@/lib/data'
import { Button } from 'antd'
import OpenButton from '@/components/button/OpenButton'
import DeleteButton from '@/components/button/DeleteButton'
import { auth } from '@/lib/auth'

const TaskCardSmall = async ({ task, action }) => {
  const user = await getUserById(task.uid)
  const session = await auth()
  const date = task.createdAt.split(" ")[0]

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.imgContainer}>
          <Image src={`${task.cover}`} alt="" fill className={styles.img} sizes="10vw" />
        </div>
        <div className={styles.infoRight}>
          <div className={styles.title}>
            <Link href={`/task/${task.title}-${task.id}`} className={styles.link}>{task.title}</Link>
          </div>
          <div className={styles.bottom}>
            <span className={styles.username}>{user.name}</span>
            <span>&nbsp;·&nbsp;</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
      {
        action && session?.user.id == task.uid && (
          <div className={styles.action}>
            <Button type='primary' href={`/space/task/update?id=${task.id}`}>更新</Button>
            <Button type='primary' href={`/space/task/statistic/${task.id}`}>统计数据</Button>
            <OpenButton task={task} />
            <DeleteButton type="task" id={task.id} title={task.title}/>
          </div>
        )
      }
      {
        action && session?.user.isAdmin && (
          <div className={styles.action}>
            <Button type='primary' href={`/space/task/statistic/${task.id}`}>统计数据</Button>
            <DeleteButton type="task" id={task.id} title={task.title}/>
          </div>
        )
      }
    </div>
  )
}

export default TaskCardSmall