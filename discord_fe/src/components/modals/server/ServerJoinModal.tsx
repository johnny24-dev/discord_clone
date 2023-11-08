import React, { useState } from 'react'
import useModal from '../../../hooks/useModal'
import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useMutation } from '@apollo/client';
import { ADD_MEMBER } from '../../../graphql/mutations/server/addMember';
import { AddMemberMutation, AddMemberMutationVariables } from '../../../gql/graphql';
import { useNavigate } from 'react-router-dom';

const ServerJoinModal = () => {
    const { isOpen, closeModal } = useModal('ServerJoin');
    const [inviteCode, setInviteCode] = useState("");
    const navigate = useNavigate()

    const [addMember, { loading, error, data }] = useMutation<AddMemberMutation, AddMemberMutationVariables>(ADD_MEMBER, {
        variables: {
            inviteCode
        },
        onCompleted: () => {
            navigate(`/servers/${data?.addMemberToServer.id}`)
            closeModal()
        },
        refetchQueries: ['GetServers']
    })
    console.log("🚀 ~ file: ServerJoinModal.tsx:24 ~ ServerJoinModal ~ data:", data)

    return (
        <Modal
            title="Join Server"
            onClose={closeModal}
            opened={isOpen}>
            <Stack>
                <TextInput
                    error={error?.message}
                    onChange={(e) => setInviteCode(e.target.value)}
                    label='InviteCode' />
                <Button
                    variant='gradient'
                    disabled={!inviteCode}
                    loading={loading}
                    onClick={() => addMember()}>Join Server</Button>
            </Stack>
        </Modal>
    )
}

export default ServerJoinModal