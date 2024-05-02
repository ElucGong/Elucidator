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

  const router = useRouter()

  useEffect(() => {
    state?.success && router.push("/login")
  }, [state?.success, router])

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
      <button>注册</button>
      {state?.error && message.error(state?.error)}
      <Link href="/login">
        一级注册过账号? <b>前往登录</b>
      </Link>
    </form>
  )
}

export default RegisterForm