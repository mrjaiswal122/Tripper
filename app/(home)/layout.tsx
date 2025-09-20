import React, { Children } from 'react'
import Navbar from '@/components/navbar'
type Props = {
    children:React.ReactNode
}

function HomeLayout({children}: Props) {
  return (
    <>
    <Navbar/>
    {Children}
    
    </>
  )
}

export default HomeLayout