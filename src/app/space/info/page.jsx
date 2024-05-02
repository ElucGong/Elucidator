import React from 'react'
import { auth } from '@/lib/auth'
import { getUserById } from '@/lib/data'
import SpaceInfoForm from '@/components/form/spaceInfoForm/SpaceInfoForm'
import styles from './info.module.css'

const SpaceInfoPage = async () => {
  const session = await auth()
  const user = await getUserById(session.user.id)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SpaceInfoForm user={user}/>
      </div>
    </div>
  )
}

export default SpaceInfoPage