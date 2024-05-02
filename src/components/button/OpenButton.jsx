"use client"

import React, { useState } from 'react'
import { setTaskState } from '@/lib/action'
import { Button, Modal } from 'antd'

const OpenButton = ({ task }) => {
  const [state, setState] = useState(task.state)
  const { confirm } = Modal;

  const handleClick = () => {
    setTaskState(task.id, 'open').then(res => res && setState('open'))
  }

  const showConfirm = () => {
    confirm({
      title: '确定要关闭任务吗？',
      content: '任务关闭状态下，别人无法在该任务下打卡。',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        setTaskState(task.id, 'closed').then(res => res && setState('closed'))
      }
    })
  }

  return (
    <div>
      <Button
        type="primary"
        danger={state == 'open'}
        style={{ width: 100 }}
        onClick={state == 'open' ? showConfirm: handleClick}
      >
        {state == 'open' ? "关闭任务" : "开启任务"}
      </Button>
    </div>
  )
}

export default OpenButton