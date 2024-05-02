"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import { message } from "antd";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined)

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="用户名" name="username" />
      <input type="password" placeholder="密码" name="password" />
      <button>登录</button>
      {state?.error && message.error(state?.error)}
      <Link href="/register">
        没有注册过账号? <b>前往注册</b>
      </Link>
    </form>
  )
}

export default LoginForm