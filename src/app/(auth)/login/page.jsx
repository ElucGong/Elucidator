// import { handleGithubLogin } from "@/lib/action";
import LoginForm from "@/components/form/loginForm/LoginForm";
import styles from "./login.module.css";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form> */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

export const metadata = {
  title: "登录"
}