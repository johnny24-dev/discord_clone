import { useQuery } from "@apollo/client"
import { GET_SERVERS } from "../../../graphql/queries/server/getServers"
import { GetServersQuery, GetServersQueryVariables } from "../../../gql/graphql"


export const useServers = () => {
    const {data:servers, loading} = useQuery<GetServersQuery, GetServersQueryVariables>(GET_SERVERS)
    return {servers:servers?.getServers, loading}

}