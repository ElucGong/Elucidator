"use client"

import React, { useEffect, useState } from 'react';
import { Input, Select, Space } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const { Search } = Input;

const options = [
  {
    value: 'task',
    label: '任务',
  },
  {
    value: 'post',
    label: '打卡'
  },
  {
    value: 'user',
    label: '用户',
  }
]

const SearchbarExplore = () => {
  const [type, setType] = useState('')
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    let type = pathname.split('/').pop()
    type = (type == 'explore' ? 'task' : type)
    setType(type)
    setQuery(searchParams.get('value') || '')
  }, [pathname, searchParams])

  const handleSearch = () => {
    const value = query.trim()
    if (value)
      router.push(`/explore/${type}?value=${value}&page=1&size=16`)
  }

  return (
    <Space.Compact >
      <Select
        size='large'
        style={{ width: 80 }}
        value={options.find(item => item.value == type)}
        options={options}
        onChange={value => setType(value)}
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

export default SearchbarExplore;