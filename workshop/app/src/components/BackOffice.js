import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import Footer from './Footer'
import ControlSidebar from './ControlSidebar'


export default function BackOffice(props) {
  return (
    <div>
      <div className='wrapper'>
        <NavBar />
        <SideBar />
        <div className='content-wrapper p-2'>
          {props.children}
        </div>
        <Footer />
        <ControlSidebar />
      </div>
    </div>
  )
}
