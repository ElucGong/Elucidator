import { getPostByTask, getStatisticPostDataByTask, getStatisticUserDataByTask, getTaskById } from '@/lib/data'
import React from 'react'
import styles from './statistic.module.css'
import { auth } from '@/lib/auth'
import SearchbarStatistic from '@/components/searchbar/searchbarStatistic/SearchbarStatistic'
import UserCardSmall from '@/components/userCard/small/UserCardSmall'
import PostCardSmall from '@/components/postCard/small/PostCardSmall'
import MyPagination from '@/components/pagination/MyPagination'
import DoughtnutChart from '@/components/echart/DoughtnutChart'

const StatisticPage = async ({ params, searchParams }) => {
  const session = await auth()
  const { id } = params
  const task = await getTaskById(id)

  if (!task)
    throw new Error("任务不存在或已删除！")

  if (session.user.id != task.uid)
    throw new Error("非法行为：这不是你创建的任务！")

  let { type, value, page, size } = searchParams

  type = type || "user"
  value = value || ''
  page = page || 1
  size = size || 10

  const pageInfoUser = await getStatisticUserDataByTask(id, value, page, size)
  const pageInfoPost = await getPostByTask(id, value, page, size)
  const postList = await getStatisticPostDataByTask(id)

  let pageInfo
  if (type == "user")
    pageInfo = pageInfoUser
  else if (type == "post")
    pageInfo = pageInfoPost

  const { total, list, pageNum } = pageInfo

  const renderContent = () => {
    if (type == 'post') {
      return (
        total ? (
          list.map(post =>
            <div className={styles.post} key={post.id}>
              <PostCardSmall post={post} />
            </div>
          )) :
          <div>抱歉，没有搜索到相关打卡</div>
      )
    } else {
      return (
        total ? (
          list.map(user =>
            <div className={styles.post} key={user.id}>
              <UserCardSmall user={user} />
            </div>
          )) :
          <div>抱歉，没有搜索到相关用户</div>
      )
    }
  }

  const countMap = new Map()
  for (let i = 0; i < postList.length; i++) {
    const { uid } = postList[i]
    if (countMap.has(uid))
      countMap.set(uid, countMap.get(uid) + 1)
    else
      countMap.set(uid, 1)
  }

  function timeFn(time) {
    const dateBegin = new Date(time.replace(/-/g, "/"))
    const dateEnd = new Date()
    const dateDiff = dateEnd.getTime() - dateBegin.getTime()
    const dayDiff = Math.ceil(dateDiff / (24 * 3600 * 1000))
    return dayDiff
  }

  const timeMap = new Map()
  for (let i = 0; i < postList.length; i++) {
    const { createdAt } = postList[i]
    let dayDiff = timeFn(createdAt)
    if (dayDiff <= 1)
      dayDiff = "1天内"
    else if (dayDiff <= 7)
      dayDiff = "7天内"
    else if (dayDiff <= 30)
      dayDiff = "30天内"
    else
      dayDiff = "30天外"
    if (timeMap.has(dayDiff))
      timeMap.set(dayDiff, timeMap.get(dayDiff) + 1)
    else
      timeMap.set(dayDiff, 1)
  }
  const data = []
  for (let [k, v] of timeMap)
    data.push({ name: k, value: v })

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.list}>
          <div>
            <span className={styles.label}>任务标题:</span>
            &nbsp;&nbsp;
            <span className={styles.value}>{task.title}</span>
          </div>
          <div>
            <span className={styles.label}>任务简介:</span>
            &nbsp;&nbsp;
            <span className={styles.value}>{task.description}</span>
          </div>
          <div>
            <span className={styles.label}>创建时间:</span>
            &nbsp;&nbsp;
            <span className={styles.value}>{task.createdAt}</span>
          </div>
          <div>
            <span className={styles.label}>订阅人数:</span>
            &nbsp;&nbsp;
            <span className={styles.value}>{pageInfoUser.total}</span>
          </div>
          <div>
            <span className={styles.label}>打卡总数:</span>
            &nbsp;&nbsp;
            <span className={styles.value}>{pageInfoPost.total}</span>
          </div>
          <div>
            <span className={styles.label}>打卡人数:</span>
            &nbsp;&nbsp;
            <span className={styles.value}>{countMap.size}</span>
          </div>
        </div>
        <div className={styles.chart}>
          <DoughtnutChart
            title="打卡时间环形图"
            name="打卡数"
            data={data}
          />
        </div>
      </div>
      <div className={styles.search}>
        <SearchbarStatistic />
        <div className={styles.content}>
          {renderContent()}
        </div>
        <MyPagination
          total={total}
          current={pageNum}
          type={type}
          value={value}
          size={size}
          caller="statistic"
        />
      </div>
    </div>
  )
}

export default StatisticPage