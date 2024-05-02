import SearchbarExplore from '@/components/searchbar/searchbarExplore/SearchbarExplore'
import React from 'react'
import styles from "./explore.module.css"

const ExplorePage = () => {
  return (
    <div className={styles.container}>
      <SearchbarExplore />
    </div>
  )
}

export default ExplorePage

export const metadata = {
  title: "发现"
}