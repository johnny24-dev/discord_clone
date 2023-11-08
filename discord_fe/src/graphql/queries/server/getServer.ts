import { gql } from "@apollo/client";

export const GET_SERVER = gql`
    query GetServer($id:Float!){
        getServer(id:$id){
            id,
            name,
            imageUrl,
            inviteCode,
            profileId,
            channels{
                id,
                type,
                name
            },
            members{
                id,
                role,
                profileId,
                profile{
                    id,
                    name,
                    imageUrl,
                    email
                }
            },
            profile{
                    id,
                    name,
                    imageUrl,
                    email
                }
        }
    }
`