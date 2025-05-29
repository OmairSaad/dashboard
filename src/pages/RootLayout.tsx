import { type FC } from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'

const RootLayout:FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
