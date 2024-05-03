"use client";

import { register } from "@/lib/action"
import styles from "./registerForm.module.css"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { message } from "antd"

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined)
  const [messageApi, contextHolder] = message.useMessage()

  const router = useRouter()

  useEffect(() => {
    if (state?.error){
      messageApi.destroy()
      messageApi.error(state.error)
    }
    else if (state?.success) {
      messageApi.destroy()
      messageApi.success(state.success, 1).then(() => router.push("/login"))
    }
  }, [state, router])

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="用户名" name="username" maxLength={50} />
      <input type="text" placeholder="邮箱" name="email" maxLength={50} />
      <input type="password" placeholder="密码" name="password" />
      <input
        type="password"
        placeholder="再次输入密码"
        name="passwordRepeat"
      />
      <button onClick={() => messageApi.loading("正在执行操作...")}>注册</button>
      <Link href="/login">
        一级注册过账号? <b>前往登录</b>
      </Link>
      {contextHolder}
    </form>
  )
}

export default RegisterForm