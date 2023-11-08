import { Button, Flex, Modal, Stack, Text } from '@mantine/core'

import useModal from '../../../hooks/useModal'
import { useServer } from '../../../hooks/graphql/server/useServer'
import { useMutation } from '@apollo/client'
import { LEAVE_SERVER } from '../../../graphql/mutations/server/leaveServer'
import { LeaveServerMutation, LeaveServerMutationVariables } from '../../../gql/graphql'
import { useNavigate } from 'react-router-dom'

const LeaveServerModal = () => {
    const leaveServerModal = useModal('LeaveServer')
    const { server } = useServer()
    const navigate = useNavigate()
    const [leaveServer, { loading }] = useMutation<LeaveServerMutation, LeaveServerMutationVariables>(LEAVE_SERVER, {
        variables: {
            serverId: Number(server?.id)
        },
        onCompleted:() => {
            navigate('/')
            leaveServerModal.closeModal()
        },
        refetchQueries:['GetServers']
    })
    return (
        <Modal
            title='Leave Server'
            opened={leaveServerModal.isOpen}
            onClose={leaveServerModal.closeModal}>
            <Stack>
                <Text fw={700}>Are you sure confirm leave this server ?</Text>
                <Flex justify={'center'}>
                    <Button
                    w={'50%'}
                    variant='gradient' 
                    loading={loading} 
                    onClick={() => leaveServer()}>Confirm</Button>
                </Flex>
            </Stack>
        </Modal>
    )
}

export default LeaveServerModal