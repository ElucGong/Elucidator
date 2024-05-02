"use client"

import React from 'react'
import { deleteTask, deletePost } from '@/lib/action'
import { Button, Modal } from 'antd'

const DeleteButton = ({ type, id }) => {
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: type == 'task' ? '确定要删除任务吗？' : '确定要删除打卡吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        if(type == 'task')
            deleteTask(id)
        else
            deletePost(id)
      }
    })
  }

  return (
    <div>
      <Button
        type="primary"
        danger
        style={{ width: 60 }}
        onClick={showConfirm}
      >
        删除
      </Button>
    </div>
  )
}

export default DeleteButton