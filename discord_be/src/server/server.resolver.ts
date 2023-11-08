import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Channel, Server } from './types';
import { Request } from 'express';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ServerService } from './server.service';
import { CreateChannelOnServerDto, CreateServerDto, UpdateServerDto } from './dto';
import { v4 as uuidv4 } from 'uuid';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js'
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Member, MemberRole } from 'src/member/member.types';


@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {

    constructor(private readonly serverService: ServerService) { }


    @Query(() => [Server])
    async getServers(
        @Context() ctx: { req: Request }
    ) {
        if (!ctx.req.profile.email) {
            throw new BadRequestException('Profile not found')
        }

        return await this.serverService.getServerByProfileEmailOfMember(ctx?.req?.profile.email)
    }

    @Query(() => Server)
    async getServer(
        @Args('id') id: number,
        @Context() ctx: { req: Request }
    ) {
        if (!ctx.req.profile.email) {
            throw new BadRequestException('Profile not found')
        }
        return await this.serverService.getServer(id, ctx.req.profile.email)
    }

    @Mutation(() => Server)
    async createChannel(
        @Args('input') input: CreateChannelOnServerDto,
        @Context() ctx: { req: Request }) {
        try {
            return await this.serverService.createChannel(input, ctx.req.profile.email)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Mutation(() => Channel)
    async deleteChannelFromServer(@Args('channelId') channelId: number, @Context() ctx: { req: Request }) {
        try {
            return await this.serverService.deleteChannelFromServer(channelId, ctx.req.profile.email)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Mutation(() => Server)
    async updateServer(
        @Args('input') input: UpdateServerDto,
        @Args('file', { type: () => GraphQLUpload, nullable: true }) file: GraphQLUpload) {
        let imageUrl;
        if (file) {
            imageUrl = await this.storeImageAndGetUrl(file)
        }
        try {
            return await this.serverService.updateServer(input, imageUrl)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Mutation(() => Server)
    async updateServerWithNewInviteCode(@Args('serverId') serverId: number) {
        try {
            return await this.serverService.updateServerWithNewInviteCode(serverId)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Mutation(() => Server)
    async createServer(
        @Args('input') input: CreateServerDto,
        @Args('file', { type: () => GraphQLUpload, nullable: true }) file: GraphQLUpload
    ) {
        if (!file) throw new BadRequestException('Image is required')

        const imageUrl = await this.storeImageAndGetUrl(file);

        return await this.serverService.createServer(input, imageUrl)


    }

    @Mutation(() => Server)
    async leaveServer(@Args('serverId') serverId: number, @Context() ctx: { req: Request }) {
        try {
            return await this.serverService.leaveServer(serverId, ctx.req.profile.email)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Mutation(() => Server)
    async deleteServer(@Args('serverId') serverId: number, @Context() ctx: { req: Request }) {
        try {
            return await this.serverService.deleteServer(serverId, ctx.req.profile.email)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Mutation(() => Server)
    async addMemberToServer(@Args('inviteCode') inviteCode: string, @Context() ctx: { req: Request }) {
        try {
            return await this.serverService.addMemberToServer(inviteCode, ctx.req.profile.email)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Mutation(() => Member)
    async changeMemberRole(
        @Args('memberId', { nullable: true }) memberId: number,
        @Args('role') role: MemberRole,
        @Context() ctx: { req: Request },
    ) {
        try {
            return this.serverService.changeMemberRole(
                memberId,
                role,
                ctx.req?.profile.email,
            );
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Mutation(() => Member)
    async deleteMember(
        @Args('memberId', { nullable: true }) memberId: number,
        @Context() ctx: { req: Request },
    ) {
        try {
            return this.serverService.deleteMember(memberId, ctx.req?.profile.email);
        } catch (err) {
            throw new BadRequestException(err.message, err.code);
        }
    }



    private async storeImageAndGetUrl(file: GraphQLUpload) {
        const { createReadStream, filename } = await file;
        const uniqueFilename = `${uuidv4()}_${filename}`;
        const imagePath = join(process.cwd(), 'public', 'images', uniqueFilename);
        const imageUrl = `${process.env.APP_URL}/images/${uniqueFilename}`;

        if (!existsSync(join(process.cwd(), 'public', 'images'))) {
            mkdirSync(join(process.cwd(), 'public', 'images'), { recursive: true });
        }

        const readStream = createReadStream();
        readStream.pipe(createWriteStream(imagePath));
        return imageUrl;
    }

}
