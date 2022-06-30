import type { NextPage } from 'next'
import { ReactNode } from 'react'
import NavBar from '../Navigation/NavBar'
import Footer from '../Navigation/Footer'

type Props = {
  children: ReactNode
}
const Layout: NextPage<Props> = ({children}) => {
  return (
    <>
    <NavBar/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout