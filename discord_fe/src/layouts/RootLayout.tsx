import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import { useProfileStore } from '../stores/profileStore'
import { useAuth, useSession } from '@clerk/clerk-react'
import { useMutation } from '@apollo/client'
import { CreateProfileMutation, CreateProfileMutationVariables } from '../gql/graphql'
import { CREATE_PROFILE } from '../graphql/mutations/createProfile'

const RootLayout = () => {

    const profile = useProfileStore((state) => state.profile)
    const setprofile = useProfileStore((state) => state.setProfile)
    const { session } = useSession()

    const { isSignedIn } = useAuth()

    const [createProfile] = useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CREATE_PROFILE, {})


    useEffect(() => {
        if (!isSignedIn) setprofile(null)
    }, [isSignedIn, setprofile])

    useEffect(() => {
        const createProfileFn = async () => {
            if (!session?.user) return
            try {
                await createProfile({
                    variables: {
                        input: {
                            email: session.user.emailAddresses[0].emailAddress,
                            imageUrl: session.user.imageUrl,
                            name: session.user.username || ""
                        }
                    },
                    onCompleted: (data) => {
                        setprofile(data.createProfile)
                    }
                })
            } catch (error) {
                console.log("🚀 ~ file: RootLayout.tsx:34 ~ createProfileFn ~ error:", error)

            }
        }
        if (profile?.id) return
        createProfileFn()
    }, [profile?.id, session?.user])

    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default RootLayout