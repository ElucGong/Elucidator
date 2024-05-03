"use client"

import React from 'react'
import styles from './spacePostForm.module.css'
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { message } from 'antd'

const SpacePostForm = ({ user, task, post, action }) => {
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
      messageApi.success(state.success, 1).then(() => router.push("/space?type=post&page=1&size=10"))
    }
  }, [state, router])

  return (
    <form className={styles.form} action={formAction}>
      <label>打卡标题</label>
      <input
        type="text"
        name="title"
        className={styles.input}
        placeholder="打卡标题(不超过100个字符)"
        maxLength={100}
        defaultValue={post?.title || ''}
      />
      <label>打卡简介</label>
      <textarea
        name="description"
        rows={10}
        placeholder="打卡简介(不超过200个字符)"
        maxLength={200}
        defaultValue={post?.description || ''}
      />
      <label>{'打卡内容（图片或视频） ' + (post ? '不更新则不用选取' : '')}</label>
      <input
        type='file'
        accept='image/*,video/*'
        name='media'
      />
      <label>{'封面 ' + (post ? '不更新则不用选取' : '')}</label>
      <input
        type='file'
        accept='image/*'
        name='cover'
      />
      <input type="hidden" name="uid" value={user.id} />
      <input type="hidden" name="tid" value={task.id} />
      <input type="hidden" name="id" value={post?.id} />
      <input type="hidden" name="oldMedia" value={post?.media} />
      <input type="hidden" name="oldCover" value={post?.cover} />
      <input type="hidden" name="state" value={task.state} />
      <button onClick={() => messageApi.loading("正在执行操作...")}>提交</button>
      {contextHolder}
    </form>
  )
}

export default SpacePostForm