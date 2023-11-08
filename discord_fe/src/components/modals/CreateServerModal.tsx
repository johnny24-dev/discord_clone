import { Button, Flex, Group, Image, Modal, Stack, Text, TextInput, rem } from '@mantine/core'
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import useModal from '../../hooks/useModal'
import classes from './CreateServerModal.module.css'
import { useState } from 'react'
import { IconUpload, IconX } from '@tabler/icons-react'
import { useMutation } from '@apollo/client'
import { CREATE_SERVER } from '../../graphql/mutations/server/createServer'
import { CreateProfileMutationVariables, CreateServerMutation } from '../../gql/graphql'
import { useProfileStore } from '../../stores/profileStore'

const CreateServerModal = () => {
    const { isOpen, closeModal } = useModal("CreateServer")

    const [createServer, { loading, error }] = useMutation<CreateServerMutation, CreateProfileMutationVariables>(CREATE_SERVER)
    console.log("🚀 ~ file: CreateServerModal.tsx:17 ~ CreateServerModal ~ error:", error?.message)

    const profileId = useProfileStore((state) => state.profile?.id)

    const [file, setFile] = useState<File | null>(null)

    const onSubmit = async () => {
        if (!form.validate()) return

        await createServer({
            variables: {
                input: {
                    name: form.values.name,
                    profileId: profileId,
                },
                file
            },
            onCompleted: () => {
                setImagePreview(null)
                setFile(null)
                form.reset()
                closeModal()
            },
            refetchQueries: ['GetServers']
        })
    }

    const form = useForm({
        initialValues: {
            name: ""
        },
        validate: {
            name: (value) => !value.trim() && "Please enter your name"
        }
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const handleDropzoneChange = (files: File[]) => {
        if (files.length == 0) {
            return setImagePreview(null)
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string)
        }
        setFile(files[0])
        reader.readAsDataURL(files[0])
    }

    return (
        <Modal
            opened={isOpen}
            onClose={closeModal}
        >
            <Text>Give you server personality with a name and an image. You can change it later</Text>
            <form onSubmit={form.onSubmit(() => onSubmit())}>
                <Stack>
                    <Flex justify={'center'} align={'center'} direction={'column'}>
                        {
                            !imagePreview &&
                            <Dropzone
                                onDrop={(files) => {
                                    handleDropzoneChange(files)
                                }}
                                className={classes.dropzone}
                                accept={IMAGE_MIME_TYPE}
                                mt={'md'}>
                                <Group className={classes.group}>
                                    <Dropzone.Accept>
                                        <IconUpload size={'3.2rem'} stroke={1.5} />
                                    </Dropzone.Accept>
                                    <Dropzone.Reject>
                                        <IconX size={'3.2rem'} stroke={1.5} />
                                    </Dropzone.Reject>
                                    <Dropzone.Idle>
                                        <IconUpload size={'3.2rem'} stroke={1.5} />
                                    </Dropzone.Idle>
                                    <>
                                        <Text size='xl' inline>
                                            Drag images here or click to slect files
                                        </Text>
                                        <Text size='sm' inline mt={7}>
                                            Upload a server icon
                                        </Text>
                                    </>
                                </Group>
                            </Dropzone>
                        }
                        {error?.message && !file && <Text c={'red'} fw={700}>{error?.message}</Text>}
                        {imagePreview && (
                            <Flex pos={'relative'} w={rem(150)} h={rem(150)} mt={'md'}>
                                <>
                                    <Button
                                        className={classes.xPreviewButton}
                                        color='red'
                                        pos={'absolute'}
                                        onClick={() => {
                                            setImagePreview(null)
                                            setFile(null)
                                        }}>
                                        <IconX color='white' />
                                    </Button>
                                    <Image src={imagePreview} w={rem(150)} h={rem(150)} m={'auto'} radius={'50%'} />
                                </>
                            </Flex>
                        )}
                    </Flex>
                    <TextInput
                        label='Server name'
                        placeholder='Enter server name'
                        {...form.getInputProps('name')}
                        error={form.errors.name}
                    />
                    <Button
                        disabled={!!form.errors.name || loading || !file}
                        m={'auto'}
                        w={'50%'}
                        type='submit'
                        variant={'gradient'} mt='md'>
                        Create Server
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}

export default CreateServerModal