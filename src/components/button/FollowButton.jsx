"use client"

import React, { useState } from 'react'
import { createFollow, deleteFollow } from '@/lib/action'
import { Button } from 'antd'

const FollowButton = ({ uid, tid, follow, logged }) => {
  const [followed, setFollowed] = useState(follow ? true : false)

  const handleClick = () => {
    if (followed)
      deleteFollow(follow.id).then(res => res && setFollowed(false))
    else
      createFollow(uid, tid).then(res => res && setFollowed(true))
  }

  return (
    <div>
      {
        logged ? (
          <Button type="primary" danger={followed} style={{ width: 100 }} onClick={handleClick}>
            {followed ? "取消订阅" : "订阅此任务"}
          </Button>
        ) : (
          <Button type="primary" style={{ width: 100 }} href='/login'>订阅先登录</Button>
        )
      }
    </div>
  )
}

export default FollowButton