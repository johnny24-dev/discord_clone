import { UserButton } from '@clerk/clerk-react'
import React, { useState } from 'react'
import classes from './Sidebar.module.css'
import { Button, Center, Image, Stack, Tooltip, UnstyledButton, rem, useMantineColorScheme } from '@mantine/core'
import { IconArrowsJoin2, IconMoon, IconPlus, IconSun } from '@tabler/icons-react';
import useModal from '../../hooks/useModal';
import { useServers } from '../../hooks/graphql/server/useServers';
import { useNavigate } from 'react-router-dom';


interface NavbarLinkProps {
    label: string,
    active?: boolean,
    imageUrl: string,
    onClick: () => void
}

const NavbarLink = ({ label, active, imageUrl, onClick }: NavbarLinkProps) => {

    return (
        <>
            <Tooltip label={label} position='right'>
                <UnstyledButton
                    onClick={onClick}
                    data-active={active || undefined}
                    variant="transparent"
                    style={{ borderRadius: rem(100) }}
                >
                    <Image src={imageUrl} w={rem(50)} h={rem(50)} radius={100} />
                </UnstyledButton>
            </Tooltip>
        </>
    )
}


const Sidebar = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const createServerModal = useModal("CreateServer");
    const { servers, loading } = useServers();
    const [active, setActive] = useState(0)
    const navigate = useNavigate()

    const links = servers?.map((server, index) => (
        <NavbarLink
            key={index}
            onClick={() => {
                setActive(index)
                navigate(`/servers/${server.id}`)
            }}
            label={server.name}
            imageUrl={server.imageUrl} />
    ))
    return (
        <nav className={classes.navbar}>
            <Stack>


                <Center>
                    <Button
                        className={classes.link}
                        variant='subtle'
                        radius={100}
                        onClick={createServerModal.openModal}>
                        <IconPlus radius={100} />
                    </Button>
                </Center>
                <Center>
                    <Button
                        className={classes.link}
                        variant='subtle'
                        radius={100}
                        onClick={() => { }}
                    >
                        <IconArrowsJoin2 radius={100} />
                    </Button>
                </Center>
                <Stack justify='center' gap={'md'} mt={'xl'}>
                    {links}
                </Stack>
            </Stack>
            <Stack justify='center' align='center'>
                <Button
                    variant='subtle'
                    onClick={toggleColorScheme}
                    radius={100}
                    p={0}>
                    {colorScheme == 'dark' ? <IconMoon /> : <IconSun />}
                </Button>
                <UserButton />
            </Stack>

        </nav>
    )
}

export default Sidebar