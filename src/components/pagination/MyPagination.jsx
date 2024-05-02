"use client"

import { Pagination } from "antd"
import { usePathname, useRouter } from "next/navigation"

const MyPagination = (props) => {
  const { total, current, type, value, size, caller } = props
  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = (page) => {
    if (caller == "explore")
      router.push(`/explore/${type}?value=${value}&page=${page}&size=${size}`)
    else if (caller == "user" || caller == "admin") {
      if (value)
        router.push(`${pathname}?type=${type}&value=${value}&page=${page}&size=${size}`)
      else
        router.push(`${pathname}?type=${type}&page=${page}&size=${size}`)
    } else if (caller == "task") {
      if (value)
        router.push(`${pathname}?value=${value}&page=${page}&size=${size}`, { scroll: false })
      else
        router.push(`${pathname}?page=${page}&size=${size}`, { scroll: false })
    } else if (caller == "statistic") {
      if (value)
        router.push(`${pathname}?type=${type}&value=${value}&page=${page}&size=${size}`, { scroll: false })
      else
        router.push(`${pathname}?type=${type}&page=${page}&size=${size}`, { scroll: false })
    }
  }

  return (
    <div>
      <Pagination
        total={total}
        pageSize={size}
        current={current}
        onChange={handlePageChange}
        showSizeChanger={false}
        hideOnSinglePage={true}
      />
    </div>
  )
}

export default MyPagination