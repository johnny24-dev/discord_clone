import { useQuery } from "@apollo/client"
import { useNavigate, useParams } from "react-router-dom"
import { GET_SERVER } from "../../../graphql/queries/server/getServer"
import { ChannelType, GetServerQuery, GetServerQueryVariables } from "../../../gql/graphql"
import { useProfileStore } from "../../../stores/profileStore"

export const useServer = () => {
    const { serverId } = useParams()
    const navigate = useNavigate()
    const profileId = useProfileStore((state) => state.profile?.id);
    const { data: server, error, loading } = useQuery<GetServerQuery, GetServerQueryVariables>(GET_SERVER, {
        variables: {
            id: Number(serverId)
        },
        onError: () => {
            navigate('/')
        }
    })

    const textChannels = server?.getServer?.channels.filter((channel) => channel.type == ChannelType.Text) || []
    const audioChannels = server?.getServer?.channels.filter((channel) => channel.type == ChannelType.Audio) || []
    const videoChannels = server?.getServer?.channels.filter((channel) => channel.type == ChannelType.Video) || []
    const members = server?.getServer.members?.filter((member) => member.profileId != profileId)
    const role = server?.getServer.members?.find((member) => member.profileId == profileId)?.role
    return {
        server:server?.getServer,
        loading,
        error,
        textChannels,
        audioChannels,
        videoChannels,
        members,
        role
    }
}