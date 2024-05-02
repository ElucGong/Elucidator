"use client"

import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const { Search } = Input;

const SearchbarTask = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('value') || '')

  useEffect(() => {
    setQuery(searchParams.get('value') || '')
  }, [searchParams])

  const handleSearch = () => {
    const value = query.trim()
    if (value)
      router.push(`${pathname}?value=${value}&page=1&size=12`, {scroll: false})
  }

  return (
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
  )
}

export default SearchbarTask