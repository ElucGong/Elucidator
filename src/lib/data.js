"use server"

const ip = process.env.BACKEND

export const getTask = async (title, page, size) => {
    const res = await fetch(`${ip}/task?value=${title}&page=${page}&size=${size}`, { next: { tags: ['task'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getTaskById = async (id) => {
    const res = await fetch(`${ip}/task/${id}`, { next: { tags: ['task'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getPost = async (title, page, size) => {
    const res = await fetch(`${ip}/post?value=${title}&page=${page}&size=${size}`, { next: { tags: ['post'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getPostById = async (id) => {
    const res = await fetch(`${ip}/post/${id}`, { next: { tags: ['post'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getUser = async (name, page, size) => {
    let res
    if (name)
        res = await fetch(`${ip}/user?value=${name}&page=${page}&size=${size}`, { next: { tags: ['user'] } })
    else
        res = await fetch(`${ip}/user?page=${page}&size=${size}`, { next: { tags: ['user'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getUserById = async (id) => {
    const res = await fetch(`${ip}/user/${id}`, { next: { tags: ['user'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getTaskByUser = async (uid, title, page, size) => {
    let res
    if (title)
        res = await fetch(`${ip}/task/uid/${uid}?title=${title}&page=${page}&size=${size}`, { next: { tags: ['task'] } })
    else
        res = await fetch(`${ip}/task/uid/${uid}?page=${page}&size=${size}`, { next: { tags: ['task'] } })

    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getPostByUser = async (uid, title, page, size) => {
    let res
    if (title)
        res = await fetch(`${ip}/post/uid/${uid}?title=${title}&page=${page}&size=${size}`, { next: { tags: ['post'] } })
    else
        res = await fetch(`${ip}/post/uid/${uid}?page=${page}&size=${size}`, { next: { tags: ['post'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getFollow = async (uid, tid) => {
    const res = await fetch(`${ip}/follow?uid=${uid}&tid=${tid}`, { next: { tags: ['follow'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getTaskByFollow = async (uid, title, page, size) => {
    let res
    if (title)
        res = await fetch(`${ip}/task/follow/uid/${uid}?title=${title}&page=${page}&size=${size}`, { next: { tags: ['task'] } })
    else
        res = await fetch(`${ip}/task/follow/uid/${uid}?page=${page}&size=${size}`, { next: { tags: ['task'] } })

    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getPostByTask = async (tid, title, page, size) => {
    let res
    if (title)
        res = await fetch(`${ip}/post/tid/${tid}?title=${title}&page=${page}&size=${size}`, { next: { tags: ['post'] } })
    else
        res = await fetch(`${ip}/post/tid/${tid}?page=${page}&size=${size}`, { next: { tags: ['post'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getStatisticPostDataByTask = async (tid) => {
    const res = await fetch(`${ip}/post/statistic/tid/${tid}`, { next: { tags: ['post', 'task'] } })
    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getStatisticUserDataByTask = async (tid, name, page, size) => {
    let res
    if (name)
        res = await fetch(`${ip}/user/statistic/tid/${tid}?name=${name}&page=${page}&size=${size}`, { next: { tags: ['user', 'follow'] } })
    else
        res = await fetch(`${ip}/user/statistic/tid/${tid}?page=${page}&size=${size}`, { next: { tags: ['user', 'follow'] } })

    if (!res.ok)
        throw new Error("数据出了点小问题...")

    return res.json()
}

export const getHitokoto = async () => {
    const res = await fetch("https://v1.hitokoto.cn/?c=a", { cache: 'no-store' })
    if (!res.ok)
        return null

    return res.json()
}