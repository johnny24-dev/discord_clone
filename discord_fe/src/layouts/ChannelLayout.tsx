import React from 'react'
import { Outlet } from 'react-router-dom'
import ServerSidebar from '../components/navigation/ServerSidebar'
import MobileSidebar from '../components/navigation/MobileSidebar'

const ChannelLayout = () => {
    return (
        <>
            <MobileSidebar />
            <Outlet />
        </>
    )
}

export default ChannelLayout