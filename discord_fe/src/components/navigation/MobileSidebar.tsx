
import { useGeneralStore } from '../../stores/generateStore'
import Sidebar from './Sidebar'
import { Drawer, rem } from '@mantine/core'
import ServerSidebar from './ServerSidebar'

const MobileSidebar = () => {
    const { drawerOpen, toggleDrawer } = useGeneralStore((state) => state)
    return (
        <>
            <Sidebar />
            <Drawer
                padding={'0'}
                mb={'0'}
                zIndex={10}
                opened={drawerOpen}
                size={rem(320)}
                withOverlay={false}
                style={{ position: 'fixed' }}
                withCloseButton={false}
                ml={rem(80)} 
                onClose={toggleDrawer}>
                    <ServerSidebar/>
            </Drawer>
        </>
    )
}

export default MobileSidebar