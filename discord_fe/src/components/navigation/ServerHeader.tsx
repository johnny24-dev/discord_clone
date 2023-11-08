import { Divider, Flex, Menu, Text, rem } from '@mantine/core'
import classes from './ServerHeader.module.css'
import { MemberRole, Server } from '../../gql/graphql'
import { IconArrowAutofitDown, IconPlus, IconSettings, IconTrash, IconX } from '@tabler/icons-react'
import useModal from '../../hooks/useModal'

const ServerHeader = ({
    server,
    memberRole
}: {
    server: Server,
    memberRole: MemberRole
}) => {

    const isAdmin = memberRole == MemberRole.Admin
    const ismorderator = memberRole == MemberRole.Modderator || isAdmin

    const inviteModal = useModal('InvitePeople')

    const updateServerModal = useModal('UpdateServer')

    const createChannel = useModal('CreateChannel')

    return (
        <Menu shadow='md' width={rem(280)}>
            <Menu.Target>
                <Flex
                    className={classes.target}
                    p={'md'}
                    justify={'space-between'}
                    align={'center'}
                    style={{ cursor: 'pointer' }}
                    w={'100%'}
                >
                    {server.name} <IconArrowAutofitDown />
                </Flex>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    onClick={inviteModal.openModal}
                    rightSection={<IconPlus />}>
                    Invite People
                </Menu.Item>
                {isAdmin && <Menu.Item
                    onClick={updateServerModal.openModal}
                    rightSection={<IconSettings />}>
                    Update Server
                </Menu.Item>}
                {ismorderator && <Menu.Item
                    onClick={createChannel.openModal}
                    rightSection={<IconPlus />}>
                    Create Channel
                </Menu.Item>}
                {ismorderator && <Divider />}
                {isAdmin && <Menu.Item
                    color='red'
                    rightSection={<IconTrash />}>
                    <Text >Delete Server</Text>
                </Menu.Item>}
                {isAdmin && <Menu.Item
                    color='red'
                    rightSection={<IconX />}>
                    <Text >Leave Server</Text>
                </Menu.Item>}
            </Menu.Dropdown>
        </Menu>
    )
}

export default ServerHeader