"use client"

import React from 'react'
import styles from './error.module.css'

const Error = ({ error }) => {
  return (
    <div className={styles.container}>
      <h1>{error.message}</h1>
    </div>
  )
}

export default Error