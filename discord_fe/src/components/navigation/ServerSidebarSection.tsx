
import { IconPlus, IconSettings2 } from '@tabler/icons-react'
import { ChannelType, MemberRole } from '../../gql/graphql'
import useModal from '../../hooks/useModal'
import { useGeneralStore } from '../../stores/generateStore'
import { Flex, Tooltip, Text } from '@mantine/core'

interface ServerSidebarSectionProps {
    sectionType: 'channels' | 'members',
    channelType: ChannelType,
    role: MemberRole,
    label: string
}

const ServerSidebarSection = (props: ServerSidebarSectionProps) => {
    const channelModal = useModal('CreateChannel')
    const manageMemberModal = useModal('ManageMember')
    const setChannelForCreateChannel = useGeneralStore((state) => state.setChannelTypeForCreateChannel)

    const handleOnClick = () => {
        setChannelForCreateChannel(props.channelType)
        channelModal.openModal()
    }

    if (props.role != MemberRole.Guest && props.sectionType == 'channels') {
        return (
            <Tooltip label='Create Channel' withArrow onClick={handleOnClick}>
                <Flex p={'md'} style={{ cursor: 'pointer' }}>
                    <Text w={'100%'} fw={700}>{props.label}</Text>
                    <IconPlus/>
                </Flex>
            </Tooltip>
        )
    }else if(props.role == MemberRole.Admin && props.sectionType == 'members'){
        return(
            <Tooltip label='Manage Members' withArrow onClick={manageMemberModal.openModal}>
                <Flex p={'md'} style={{ cursor: 'pointer' }}>
                    <Text w={'100%'} fw={700}>{props.label}</Text>
                    <IconSettings2/>
                </Flex>
            </Tooltip>
        )
    }
}

export default ServerSidebarSection