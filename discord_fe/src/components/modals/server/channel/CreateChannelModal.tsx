import useModal from '../../../../hooks/useModal'
import { Button, Flex, Modal, Select, Stack, TextInput } from '@mantine/core'
import { useGeneralStore } from '../../../../stores/generateStore'
import { useForm } from '@mantine/form'
import { ChannelType, CreateChannelMutation, CreateChannelMutationVariables } from '../../../../gql/graphql'
import { useServer } from '../../../../hooks/graphql/server/useServer'
import { useMutation } from '@apollo/client'
import { CREATE_CHANNEL } from '../../../../graphql/mutations/server/createChannel'

const CreateChannelModal = () => {
    const channelType = useGeneralStore((state) => state.channelTypeForCreateChannel)
    const { isOpen, closeModal } = useModal('CreateChannel')

    const form = useForm(({
        initialValues: {
            name: "",
            type: channelType ? channelType : ChannelType.Text
        },
        validate: {
            name: (value) => !value.trim()
                ? 'Please enter a name'
                : value == 'general'
                    ? 'Channel name can not be general' : null,
            type: (value) => !value!.trim() && 'Please select a type'
        }
    }))
    const { server } = useServer()
    const [createChannel, { loading, error }] = useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CREATE_CHANNEL, {
        variables: {
            input: {
                serverId: server?.id,
                name: form.values.name,
                type: form.values.type,
            },
        },
        refetchQueries: ["GetServer"],
        onCompleted: () => {
            closeModal()
            form.reset()
        },
    })
    return (
        <Modal title="Create Channel" opened={isOpen} onClose={closeModal}>
            <Stack>
                <Flex direction={'column'}>
                    <TextInput
                        label='Channel Name'
                        mb={'md'}
                        {...form.getInputProps('name')}
                        error={form.errors.name || error?.message} />

                    <Select
                        label='Channel Type'
                        data={Object.values(ChannelType).map(type => type)}
                        {...form.getInputProps('type')}
                    />
                </Flex>
                <Button
                    onClick={() => createChannel()}
                    loading={loading}
                    disabled={loading || !!error?.message || !form.values.name || !form.values.type}
                    mt={'md'}
                    variant='gradient'>
                    Create Channel
                </Button>
            </Stack>
        </Modal>
    )
}

export default CreateChannelModal