import React, { useEffect } from 'react'
import useModal from '../../../hooks/useModal'
import { Button, Flex, Modal, Stack, TextInput } from '@mantine/core'
import { useServer } from '../../../hooks/graphql/server/useServer';
import { useClipboard } from '@mantine/hooks';
import { useMutation } from '@apollo/client';
import { UPDATE_SERVER_WITH_NEW_INVITE_CODE } from '../../../graphql/mutations/server/updateServerWithNewInviteCode';
import { UpdateServerWithNewInviteCodeMutation, UpdateServerWithNewInviteCodeMutationVariables } from '../../../gql/graphql';
import { useForm } from '@mantine/form';
import { IconCheck, IconCopy } from '@tabler/icons-react';

const InviteModal = () => {
    const { isOpen, closeModal } = useModal("InvitePeople");
    const { server } = useServer()

    const clipBoard = useClipboard({
        timeout: 1000
    })
    console.log("🚀 ~ file: InviteModal.tsx:19 ~ InviteModal ~ clipBoard:", clipBoard)

    const [updateServerWithNewInviteCodem, { error, loading }] = useMutation<UpdateServerWithNewInviteCodeMutation, UpdateServerWithNewInviteCodeMutationVariables>(UPDATE_SERVER_WITH_NEW_INVITE_CODE)

    const form = useForm({
        initialValues: {
            inviteCode: server?.inviteCode
        }
    })

    useEffect(() => {
        if (!server?.inviteCode) return
        form.setValues({
            inviteCode: server?.inviteCode
        })
    }, [server?.inviteCode])

    return (
        <Modal
            opened={isOpen}
            onClose={closeModal}
            title="Invite People">
            <Stack>
                <Flex>
                    <TextInput
                        w={'100%'}
                        label="Server Invite Code"
                        {...form.getInputProps('inviteCode')}
                        rightSection={
                            <Button variant='transparent' onClick={() => {
                                clipBoard.copy(form.values.inviteCode)

                            }}>
                                {!clipBoard.copied ? <IconCopy /> : <IconCheck color='green' />}
                            </Button>
                        } />
                </Flex>
                <Button disabled={loading} onClick={() => updateServerWithNewInviteCodem({
                    variables: {
                        serverId: server?.id
                    }
                })}>Generate New Invite Code</Button>
            </Stack>
        </Modal>
    )
}

export default InviteModal