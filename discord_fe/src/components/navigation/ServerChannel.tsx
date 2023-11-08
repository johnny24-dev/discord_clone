
import { Channel, ChannelType, MemberRole, Server } from '../../gql/graphql'
import { IconCamera, IconHash, IconMessage, IconMicrophone, IconTrash } from '@tabler/icons-react'
import useModal from '../../hooks/useModal'
import { useNavigate } from 'react-router-dom'
import { NavLink, Stack, rem } from '@mantine/core'
import { useGeneralStore } from '../../stores/generateStore'

type ServerChannelProps = {
    channel: Channel | null,
    server: Server,
    role?: MemberRole,
    isActive?: boolean
}

const iconMap = {
    [ChannelType.Text]: <IconHash size={15} />,
    [ChannelType.Audio]: <IconMicrophone size={15} />,
    [ChannelType.Video]: <IconCamera size={15} />
}

const ServerChannel = (props: ServerChannelProps) => {
    if (!props.channel || !props.server) return null
    const Icon = iconMap[props.channel.type];
    const deleteChannel = useModal('DeleteChannel');
    const updateChannel = useModal('UpdateChannel');

    const setChannelToBeDeleteOrUpdateId = useGeneralStore((state) => state.setChannelToBeDeleteOrUpdateId)

    const navigate = useNavigate();
    if (props.channel.name != 'general') {
        return (
            <NavLink
                ml={'md'}
                w={rem(200)}
                label={props.channel.name}
                rightSection={Icon}
                active={props.isActive}>
                {props.role != MemberRole.Guest && (
                    <Stack>
                        <NavLink
                            label='Join'
                            rightSection={<IconMessage size={15} />}
                            onClick={() => navigate(`/servers/${props.server.id}/channels/${props.channel?.type}/${props.channel?.id}`)} />
                        <NavLink
                            label='Delete'
                            rightSection={<IconTrash size={15} />}
                            onClick={() => {
                                setChannelToBeDeleteOrUpdateId(Number(props.channel?.id))
                                deleteChannel.openModal()
                            }} />
                    </Stack>
                )}
            </NavLink>
        )
    }

}

export default ServerChannel