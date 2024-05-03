import { auth } from "@/lib/auth";
import styles from "./page.module.css";
import { getHitokoto } from "@/lib/data";

export default async function Home() {
  const hitokoto = await getHitokoto()
  const session = await auth()

  const renderFrom = () => {
    if (hitokoto.from_who)
      return (
        <div className={styles.from}>
          —&nbsp;{hitokoto.from_who}&nbsp;《{hitokoto.from}》
        </div>
      )
    else
      return (
        <div className={styles.from}>
          —&nbsp;《{hitokoto.from}》
        </div>
      )
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>欢迎使用本视频打卡系统！</h1>
        <h2>每个人都可以在这里实现自由地教学，参与丰富的活动！</h2>
        {
          session ? 
          <h2>欢迎回来，{session.user.name}！</h2>
          :
          <h2>点击右上角登录以解锁完整的功能！</h2>
        }
      </div>
      {
        hitokoto &&
        <div className={styles.mid}>
          <div className={styles.content}>
            {hitokoto.hitokoto}
          </div>
          {renderFrom()}
        </div>
      }
      <div className={styles.bot}>
        {session && !(session.user.isActive) && <h3>您的账号已被停用！</h3>}
      </div>
    </div>
  )
}
