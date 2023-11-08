/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nmutation CreateProfile($input: CreateProfileDto!){\n    createProfile(input:$input){\n        id,\n        imageUrl,\n        name,\n        email\n    }\n}\n": types.CreateProfileDocument,
    "\n    mutation AddMember($inviteCode:String!){\n        addMemberToServer(inviteCode:$inviteCode){\n            id,\n            name,\n            imageUrl\n        }\n    }\n": types.AddMemberDocument,
    "\n    mutation CreateChannel($input:CreateChannelOnServerDto!){\n        createChannel(input:$input){\n            id,\n            name,\n            imageUrl,\n            members{\n                id\n            }\n        }\n    }\n": types.CreateChannelDocument,
    "\n    mutation CreateServer($input:CreateServerDto!, $file:Upload){\n        createServer(input:$input,file:$file){\n            id,\n            name,\n            imageUrl,\n            members{\n                id\n            },\n\n        }\n    }\n": types.CreateServerDocument,
    "\n    mutation DeleteChannel($channelId:Float!){\n        deleteChannelFromServer(channelId:$channelId){\n            id,\n            name,\n            type\n        }\n    }\n": types.DeleteChannelDocument,
    "\n    mutation DeleteServer($serverId:Float!){\n        deleteServer(serverId:$serverId){\n            id,\n            name,\n            imageUrl\n        }\n    }\n": types.DeleteServerDocument,
    "\n    mutation LeaveServer($serverId:Float!){\n        leaveServer(serverId:$serverId){\n            id,\n            name,\n            imageUrl\n        }\n    }\n\n": types.LeaveServerDocument,
    "\n    mutation UpdateServer($input:UpdateServerDto!, $file:Upload){\n        updateServer(input:$input, file:$file){\n            id,\n            name,\n            imageUrl\n        }\n    }\n": types.UpdateServerDocument,
    "\n    mutation UpdateServerWithNewInviteCode($serverId:Float!){\n        updateServerWithNewInviteCode(serverId:$serverId){\n            id,\n            name,\n            imageUrl,\n            inviteCode\n        }\n    }\n": types.UpdateServerWithNewInviteCodeDocument,
    "\n    query GetServer($id:Float!){\n        getServer(id:$id){\n            id,\n            name,\n            imageUrl,\n            inviteCode,\n            profileId,\n            channels{\n                id,\n                type,\n                name\n            },\n            members{\n                id,\n                role,\n                profileId,\n                profile{\n                    id,\n                    name,\n                    imageUrl,\n                    email\n                }\n            },\n            profile{\n                    id,\n                    name,\n                    imageUrl,\n                    email\n                }\n        }\n    }\n": types.GetServerDocument,
    "\n    query GetServers{\n        getServers{\n            id,\n            name,\n            imageUrl,\n            channels{\n                id,\n                type\n            }\n        }\n    }\n": types.GetServersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateProfile($input: CreateProfileDto!){\n    createProfile(input:$input){\n        id,\n        imageUrl,\n        name,\n        email\n    }\n}\n"): (typeof documents)["\nmutation CreateProfile($input: CreateProfileDto!){\n    createProfile(input:$input){\n        id,\n        imageUrl,\n        name,\n        email\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation AddMember($inviteCode:String!){\n        addMemberToServer(inviteCode:$inviteCode){\n            id,\n            name,\n            imageUrl\n        }\n    }\n"): (typeof documents)["\n    mutation AddMember($inviteCode:String!){\n        addMemberToServer(inviteCode:$inviteCode){\n            id,\n            name,\n            imageUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateChannel($input:CreateChannelOnServerDto!){\n        createChannel(input:$input){\n            id,\n            name,\n            imageUrl,\n            members{\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation CreateChannel($input:CreateChannelOnServerDto!){\n        createChannel(input:$input){\n            id,\n            name,\n            imageUrl,\n            members{\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateServer($input:CreateServerDto!, $file:Upload){\n        createServer(input:$input,file:$file){\n            id,\n            name,\n            imageUrl,\n            members{\n                id\n            },\n\n        }\n    }\n"): (typeof documents)["\n    mutation CreateServer($input:CreateServerDto!, $file:Upload){\n        createServer(input:$input,file:$file){\n            id,\n            name,\n            imageUrl,\n            members{\n                id\n            },\n\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteChannel($channelId:Float!){\n        deleteChannelFromServer(channelId:$channelId){\n            id,\n            name,\n            type\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteChannel($channelId:Float!){\n        deleteChannelFromServer(channelId:$channelId){\n            id,\n            name,\n            type\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteServer($serverId:Float!){\n        deleteServer(serverId:$serverId){\n            id,\n            name,\n            imageUrl\n        }\n    }\n"): (typeof documents)["\n    mutation DeleteServer($serverId:Float!){\n        deleteServer(serverId:$serverId){\n            id,\n            name,\n            imageUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LeaveServer($serverId:Float!){\n        leaveServer(serverId:$serverId){\n            id,\n            name,\n            imageUrl\n        }\n    }\n\n"): (typeof documents)["\n    mutation LeaveServer($serverId:Float!){\n        leaveServer(serverId:$serverId){\n            id,\n            name,\n            imageUrl\n        }\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateServer($input:UpdateServerDto!, $file:Upload){\n        updateServer(input:$input, file:$file){\n            id,\n            name,\n            imageUrl\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateServer($input:UpdateServerDto!, $file:Upload){\n        updateServer(input:$input, file:$file){\n            id,\n            name,\n            imageUrl\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateServerWithNewInviteCode($serverId:Float!){\n        updateServerWithNewInviteCode(serverId:$serverId){\n            id,\n            name,\n            imageUrl,\n            inviteCode\n        }\n    }\n"): (typeof documents)["\n    mutation UpdateServerWithNewInviteCode($serverId:Float!){\n        updateServerWithNewInviteCode(serverId:$serverId){\n            id,\n            name,\n            imageUrl,\n            inviteCode\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetServer($id:Float!){\n        getServer(id:$id){\n            id,\n            name,\n            imageUrl,\n            inviteCode,\n            profileId,\n            channels{\n                id,\n                type,\n                name\n            },\n            members{\n                id,\n                role,\n                profileId,\n                profile{\n                    id,\n                    name,\n                    imageUrl,\n                    email\n                }\n            },\n            profile{\n                    id,\n                    name,\n                    imageUrl,\n                    email\n                }\n        }\n    }\n"): (typeof documents)["\n    query GetServer($id:Float!){\n        getServer(id:$id){\n            id,\n            name,\n            imageUrl,\n            inviteCode,\n            profileId,\n            channels{\n                id,\n                type,\n                name\n            },\n            members{\n                id,\n                role,\n                profileId,\n                profile{\n                    id,\n                    name,\n                    imageUrl,\n                    email\n                }\n            },\n            profile{\n                    id,\n                    name,\n                    imageUrl,\n                    email\n                }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetServers{\n        getServers{\n            id,\n            name,\n            imageUrl,\n            channels{\n                id,\n                type\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetServers{\n        getServers{\n            id,\n            name,\n            imageUrl,\n            channels{\n                id,\n                type\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;