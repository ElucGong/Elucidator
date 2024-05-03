"use client"

import React from 'react'
import styles from './spaceTaskForm.module.css'
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { message } from 'antd'

const SpaceTaskForm = ({ user, task, action }) => {
  const [state, formAction] = useFormState(action, undefined)
  const [messageApi, contextHolder] = message.useMessage()

  const router = useRouter()

  useEffect(() => {
    if (state?.error){
      messageApi.destroy()
      messageApi.error(state.error)
    }
    else if (state?.success) {
      messageApi.destroy()
      messageApi.success(state.success, 1).then(() => router.push("/space"))
    }
  }, [state, router])

  return (
    <form className={styles.form} action={formAction}>
      <label>任务标题</label>
      <input
        type="text"
        name="title"
        className={styles.input}
        placeholder="任务标题(不超过100个字符)"
        maxLength={100}
        defaultValue={task?.title || ''}
      />
      <label>任务简介</label>
      <textarea
        name="description"
        rows={10}
        placeholder="任务简介(不超过200个字符)"
        maxLength={200}
        defaultValue={task?.description || ''}
      />
      <label>{'示范或图文要求（图片或视频） ' + (task ? '不更新则不用选取' : '')}</label>
      <input
        type='file'
        accept='image/*,video/*'
        name='media'
      />
      <label>{'封面 ' + (task ? '不更新则不用选取' : '')}</label>
      <input
        type='file'
        accept='image/*'
        name='cover'
      />
      <input type="hidden" name="uid" value={user.id} />
      <input type="hidden" name="id" value={task?.id} />
      <input type="hidden" name="oldMedia" value={task?.media} />
      <input type="hidden" name="oldCover" value={task?.cover} />
      <button onClick={() => messageApi.loading("正在执行操作...")}>提交</button>
      {contextHolder}
    </form>
  )
}

export default SpaceTaskForm