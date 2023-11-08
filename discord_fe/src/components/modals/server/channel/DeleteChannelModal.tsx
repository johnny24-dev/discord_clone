
import useModal from '../../../../hooks/useModal'
import { Button, Flex, Modal, Text } from '@mantine/core'
import { useServer } from '../../../../hooks/graphql/server/useServer'
import { useGeneralStore } from '../../../../stores/generateStore'
import { useMutation } from '@apollo/client'
import { DELETE_CHANNEL } from '../../../../graphql/mutations/server/deleteChannel'
import { DeleteChannelMutation, DeleteChannelMutationVariables } from '../../../../gql/graphql'
import { useNavigate } from 'react-router-dom'

const DeleteChannelModal = () => {
    const { isOpen, closeModal } = useModal('DeleteChannel')
    const { server } = useServer()
    const navigate = useNavigate()
    const channelToBeDeleteOrUpdateId = useGeneralStore((state) => state.channelToBeDeleteOrUpdateId);

    const [deleteChannel, {loading }] = useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DELETE_CHANNEL, {
        variables: {
            channelId: Number(channelToBeDeleteOrUpdateId)
        },
        refetchQueries: ['GetServer'],
        onCompleted: () => {
            closeModal()
            navigate(`/servers/${server?.id}`)
        }
    })

    return (
        <Modal
            opened={isOpen}
            onClose={closeModal}
            title="Delete Channel">
            <Text fw={700}>Are you sure you want to delete this channel?</Text>
            <Flex justify={'center'}>
                <Button
                    onClick={() => deleteChannel()}
                    disabled={loading}
                    mt={'lg'}
                    color='red'>Delete Channel</Button>
            </Flex>

        </Modal>
    )
}

export default DeleteChannelModal