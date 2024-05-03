"use server"

import bcrypt from "bcryptjs"
import axios from "axios"
import { signOut, signIn } from "./auth"
import { revalidateTag } from "next/cache"

const ip = process.env.BACKEND

export const register = async (prevState, formData) => {
    const { username, email, password, passwordRepeat } = Object.fromEntries(formData)

    if (!username)
        return { error: "请输入用户名！" }
    if (!email)
        return { error: "请输入邮箱！" }
    if (!password)
        return { error: "请输入密码！" }
    if (!passwordRepeat)
        return { error: "请再次输入密码！" }
    if (password != passwordRepeat)
        return { error: "两次密码输入不一致!" }
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!pattern.test(email))
        return { error: "邮箱格式不正确！" }

    let res = await axios({
        url: `${ip}/user/name/${username}`,
    })
    if (res.data)
        return { error: "用户名已被使用！" }

    res = await axios({
        url: `${ip}/user/email/${email}`,
    })
    if (res.data)
        return { error: "邮箱已被使用！" }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = {
        name: username,
        email,
        password: hashedPassword,
    }

    res = await axios({
        url: `${ip}/user`,
        method: 'post',
        data: newUser
    })

    return res.data >= 1 ? { success: "创建成功！" } : { error: "创建失败！" }
}

export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn("credentials", { username, password })
    } catch (err) {
        console.log("-------------------------------")
        console.log(err)
        console.log("-------------------------------")

        if (err.message.includes("credentialssignin")) {
            return { error: "无效的用户名或密码" }
        }
        // return { error: "Something went wrong" }
        throw err
    }
}

export const logout = async () => {
    await signOut()
}

export const updateUserInfo = async (prevState, formData) => {
    let { id, username, description, avatar, newAvatar } = Object.fromEntries(formData)

    if (!username.trim())
        return { error: "昵称不能为空或只由空字符构成!" }

    let res = await axios({
        url: `${ip}/user/name/${username}`,
    })

    if (res.data && res.data.id != id)
        return { error: "昵称已存在!" }

    if (newAvatar.size > 500000000)
        return { error: "图片太大了!" }
    else if (newAvatar.size > 0) {
        let formData = new FormData()
        formData.append('uploadFile', newAvatar)
        formData.append('uid', id)
        res = await axios({
            url: `${ip}/upload`,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })

        avatar = res.data
    }

    res = await axios({
        url: `${ip}/user`,
        method: 'put',
        data: {
            id,
            name: username,
            description,
            avatar
        }
    })
    revalidateTag("user")

    return res.data >= 1 ? { success: "修改成功！" } : { error: "修改失败！" }
}

export const setUserState = async (id, isActive) => {
    console.log('sssssssssss', isActive)
    const res = await axios({
        url: `${ip}/user/state`,
        method: 'put',
        data: {
            id,
            isActive
        }
    })
    revalidateTag("user")

    return res.data
}

export const createTask = async (prevState, formData) => {
    let { uid, title, description, media, cover } = Object.fromEntries(formData)

    if (!title.trim())
        return { error: "标题不能为空或只由空字符构成!"}

    if (!media.size)
        return { error: "示范或图文要求不能为空!" }
    else if (media.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    if (!cover.size)
        return { error: "封面不能为空!" }
    else if (cover.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    let res
    formData = new FormData()
    formData.append('uploadFile', media)
    formData.append('uid', uid)
    res = await axios({
        url: `${ip}/upload`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
    const mediaURI = res.data

    formData = new FormData()
    formData.append('uploadFile', cover)
    formData.append('uid', uid)
    res = await axios({
        url: `${ip}/upload`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
    const coverURI = res.data

    res = await axios({
        url: `${ip}/task`,
        method: 'post',
        data: {
            title,
            description,
            media: mediaURI,
            cover: coverURI,
            uid
        }
    })
    revalidateTag("task")

    return res.data >= 1 ? { success: "创建成功！" } : { error: "创建失败！" }
}

export const updateTask = async (prevState, formData) => {
    let { id, uid, title, description, media, cover, oldMedia, oldCover } = Object.fromEntries(formData)

    if (!title.trim())
        return { error: "标题不能为空或只由空字符构成!" }

    if (media.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    if (cover.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    let mediaURI = '', coverURI = ''
    if (media.size > 0) {
        formData = new FormData()
        formData.append('uploadFile', media)
        formData.append('uid', uid)
        const res = await axios({
            url: `${ip}/upload`,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        mediaURI = res.data
    }
    if (cover.size > 0) {
        formData = new FormData()
        formData.append('uploadFile', cover)
        formData.append('uid', uid)
        const res = await axios({
            url: `${ip}/upload`,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        coverURI = res.data
    }

    mediaURI = mediaURI || oldMedia
    coverURI = coverURI || oldCover

    const res = await axios({
        url: `${ip}/task`,
        method: 'put',
        data: {
            id,
            title,
            description,
            media: mediaURI,
            cover: coverURI,
        }
    })
    revalidateTag("task")

    return res.data >= 1 ? { success: "更新成功！" } : { error: "更新失败！" }
}

export const setTaskState = async (id, state) => {
    const res = await axios({
        url: `${ip}/task/state`,
        method: 'put',
        data: {
            id,
            state
        }
    })
    revalidateTag("task")

    return res.data
}

export const deleteTask = async (id) => {
    const res = await axios({
        url: `${ip}/task/${id}`,
        method: 'delete',
    })
    revalidateTag('task')

    return res.data
}

export const createPost = async (prevState, formData) => {
    let { title, description, media, cover, uid, tid, state } = Object.fromEntries(formData)

    if (state == 'closed')
        return { error: "该任务已关闭，无法打卡！" }

    if (!title.trim())
        return { error: "标题不能为空或只由空字符构成!" }

    if (!media.size)
        return { error: "打卡内容不能为空!" }
    else if (media.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    if (!cover.size)
        return { error: "封面不能为空!" }
    else if (cover.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    let res
    formData = new FormData()
    formData.append('uploadFile', media)
    formData.append('uid', uid)
    res = await axios({
        url: `${ip}/upload`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
    const mediaURI = res.data

    formData = new FormData()
    formData.append('uploadFile', cover)
    formData.append('uid', uid)
    res = await axios({
        url: `${ip}/upload`,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
    const coverURI = res.data

    res = await axios({
        url: `${ip}/post`,
        method: 'post',
        data: {
            title,
            description,
            media: mediaURI,
            cover: coverURI,
            uid,
            tid
        }
    })
    revalidateTag("post")

    return res.data >= 1 ? { success: "创建成功！" } : { error: "创建失败！" }
}

export const updatePost = async (prevState, formData) => {
    let { id, title, description, media, cover, uid, oldMedia, oldCover } = Object.fromEntries(formData)

    if (!title.trim())
        return { error: "标题不能为空或只由空字符构成!" }

    if (media.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    if (cover.size > 500000000)
        return { error: "上传文件大小不能超过500MB!" }

    let mediaURI = '', coverURI = ''
    if (media.size > 0) {
        formData = new FormData()
        formData.append('uploadFile', media)
        formData.append('uid', uid)
        const res = await axios({
            url: `${ip}/upload`,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        mediaURI = res.data
    }
    if (cover.size > 0) {
        formData = new FormData()
        formData.append('uploadFile', cover)
        formData.append('uid', uid)
        const res = await axios({
            url: `${ip}/upload`,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        coverURI = res.data
    }

    mediaURI = mediaURI || oldMedia
    coverURI = coverURI || oldCover

    const res = await axios({
        url: `${ip}/post`,
        method: 'put',
        data: {
            id,
            title,
            description,
            media: mediaURI,
            cover: coverURI,
        }
    })
    revalidateTag("post")

    return res.data >= 1 ? { success: "更新成功！" } : { error: "更新失败！" }
}

export const deletePost = async (id) => {
    const res = await axios({
        url: `${ip}/post/${id}`,
        method: 'delete',
    })
    revalidateTag("post")

    return res.data
}

export const createFollow = async (uid, tid) => {
    const res = await axios({
        url: `${ip}/follow`,
        method: 'post',
        data: {
            uid,
            tid
        }
    })
    revalidateTag("follow")

    return res.data
}

export const deleteFollow = async (id) => {
    const res = await axios({
        url: `${ip}/follow/${id}`,
        method: 'delete',
    })
    revalidateTag("follow")

    return res.data
}

