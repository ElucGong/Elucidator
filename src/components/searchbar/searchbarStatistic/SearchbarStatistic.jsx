"use client"

import React, { useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const { Search } = Input;

const options = [
  {
    value: 'user',
    label: '订阅该任务的用户',
  },
  {
    value: 'post',
    label: '该任务下的打卡'
  }
]

const SearchbarStatistic = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [type, setType] = useState(searchParams.get('type') || 'user')
  const [query, setQuery] = useState(searchParams.get('value') || '')

  useEffect(() => {
    setType(searchParams.get('type') || 'user')
    setQuery(searchParams.get('value') || '')
  }, [searchParams])

  const handleSearch = () => {
    const value = query.trim()
    if (value)
      router.push(`${pathname}?type=${type}&value=${value}&page=1&size=10`)
  }

  return (
    <Space.Compact >
      <Select
        size='large'
        style={{ width: 200 }}
        value={options.find(item => item.value == type)}
        options={options}
        onChange={type => {
          setType(type)
          setQuery('')
          router.push(`${pathname}?type=${type}&page=1&size=10`, { scroll: false })
        }}
      />
      <Search
        size='large'
        style={{ width: '30vw' }}
        variant='filled'
        value={query}
        placeholder="输入关键字搜索"
        allowClear
        onChange={e => setQuery(e.target.value)}
        onSearch={handleSearch}
        enterButton
      />
    </Space.Compact>
  )
};

export default SearchbarStatistic