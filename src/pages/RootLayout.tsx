import { type FC } from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'

const RootLayout:FC = () => {
  return (
    <> 
      {/* Header component is rendered at the top of the page */}
      <Header />
      <main>
        {/* Outlet is used to render child routes */}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
