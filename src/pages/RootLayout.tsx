import { type FC } from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'
import { SearchProvider } from '../Context/SearchContext'

const RootLayout:FC = () => {
  return (
    <>
      <SearchProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      </SearchProvider>
    </>
  )
}

export default RootLayout
