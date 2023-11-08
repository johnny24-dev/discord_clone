import { Button, Modal, Text, Flex } from "@mantine/core"
import useModal from "../../../hooks/useModal"
import { useServer } from "../../../hooks/graphql/server/useServer"
import { useMutation } from "@apollo/client"
import { DELETE_SERVER } from "../../../graphql/mutations/server/deleteServer"
import { DeleteServerMutation, DeleteServerMutationVariables } from "../../../gql/graphql"
import { useNavigate } from "react-router-dom"


const DeleteServerModal = () => {
    const { isOpen, closeModal } = useModal('DeleteServer')
    const { server } = useServer()
    const navigate = useNavigate()
    const [deleteServer, { loading }] = useMutation<DeleteServerMutation, DeleteServerMutationVariables>(DELETE_SERVER, {
        variables: {
            serverId: Number(server?.id)
        },
        onCompleted:() => {
            closeModal()    
            navigate('/')
        },
        refetchQueries:['GetServers']
    })
    return (
        <Modal
            title="Delete Server"
            onClose={closeModal}
            opened={isOpen}>
            <Text fw={700}>Are you sure you want to delete this server?</Text>
            <Flex justify={'center'}>
                <Button
                    onClick={() => deleteServer()}
                    disabled={loading}
                    mt={'lg'}
                    color='red'>Delete Server</Button>
            </Flex>
        </Modal>
    )
}

export default DeleteServerModal