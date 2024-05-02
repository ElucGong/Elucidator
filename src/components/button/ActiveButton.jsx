"use client"

import React, { useState } from 'react'
import { setUserState } from '@/lib/action'
import { Button, Modal } from 'antd'

const ActiveButton = ({ user }) => {
  const [isActive, setIsActive] = useState(user.isActive)
  const { confirm } = Modal;

  const handleClick = () => {
    setUserState(user.id, true).then(res => res && setIsActive(true))
  }

  const showConfirm = () => {
    confirm({
      title: '确定要停用该用户吗？',
      content: '用户停用状态下，登录后仅能访问主页面。',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        setUserState(user.id, false).then(res => res && setIsActive(false))
      }
    })
  }

  return (
    <div>
      <Button
        type="primary"
        danger={isActive}
        style={{ width: 100 }}
        onClick={isActive ? showConfirm: handleClick}
      >
        {isActive ? "停用用户" : "解除停用"}
      </Button>
    </div>
  )
}

export default ActiveButton