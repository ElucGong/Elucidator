"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import { message } from "antd";
import { useEffect } from "react";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (state?.error){
      messageApi.destroy()
      messageApi.error(state.error)
    }
  }, [state, messageApi])

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="用户名" name="username" />
      <input type="password" placeholder="密码" name="password" />
      <button onClick={() => messageApi.loading("正在执行操作...", 0)}>登录</button>
      <Link href="/register">
        没有注册过账号? <b>前往注册</b>
      </Link>
      {contextHolder}
    </form>
  )
}

export default LoginForm