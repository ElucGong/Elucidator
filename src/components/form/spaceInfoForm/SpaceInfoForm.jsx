"use client";

import styles from "./spaceInfoForm.module.css"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { updateUserInfo } from "@/lib/action";
import Image from "next/image";
import { UserOutlined } from '@ant-design/icons'
import { Avatar, message } from 'antd'

const SpaceInfoForm = ({ user }) => {
  const [state, formAction] = useFormState(updateUserInfo, undefined)
  const [avatar, setAvatar] = useState(user.avatar)
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
  }, [state, router, messageApi])

  const renderAvatar = () => {
    if (avatar == 'origin')
      return <UserOutlined />
    else
      return <Image src={`${avatar}`} alt="" fill sizes="10vw" />
  }

  const handleChange = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <form className={styles.form} action={formAction}>
      <label>昵称</label>
      <input
        type="text"
        name="username"
        className={styles.input}
        placeholder="昵称(不超过50个字符)"
        maxLength={50}
        defaultValue={user.name}
      />
      <label>简介</label>
      <textarea
        name="description"
        rows={10}
        placeholder="简介(不超过100个字符)"
        maxLength={100}
        defaultValue={user.description}
      />
      <label>头像</label>
      <div className={styles.avatar}>
        <Avatar size={80} icon={renderAvatar()} />
        <input type="file" accept="image/*" name="newAvatar" onChange={handleChange} />
      </div>
      <input type="hidden" name="id" value={user.id} />
      <input type="hidden" name="avatar" value={user.avatar} />
      <button onClick={() => messageApi.loading("正在执行操作...")}>保存</button>
      {contextHolder}
    </form>
  )
}

export default SpaceInfoForm