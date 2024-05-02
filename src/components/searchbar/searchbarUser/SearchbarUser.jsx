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
  }
]

const SearchbarUser = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [type, setType] = useState(searchParams.get('type' || 'task'))
  const [query, setQuery] = useState(searchParams.get('value') || '')

  useEffect(() => {
    setType(searchParams.get('type') || 'task')
    setQuery(searchParams.get('value') || '')
  }, [searchParams])

  const handleSearch = () => {
    const value = query.trim()
    if (value)
      router.push(`${pathname}?type=${type}&value=${value}&page=1&size=16`)
  }

  return (
    <Space.Compact >
      <Select
        size='large'
        style={{ width: 80 }}
        value={options.find(item => item.value == type)}
        options={options}
        onChange={type => {
          setType(type)
          setQuery('')
          router.push(`${pathname}?type=${type}&page=1&size=16`)
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

export default SearchbarUser