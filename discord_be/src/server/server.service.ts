import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChannelOnServerDto, CreateServerDto, UpdateServerDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole } from 'src/member/member.types';
import { ChannelType } from './types';

@Injectable()
export class ServerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createServer(input: CreateServerDto, imageUrl: string) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                id: input.profileId
            }
        })

        if (!profile) throw new BadRequestException('Profile not found')

        return await this.prisma.server.create({
            data: {
                ...input,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {
                            name: 'general',
                            profileId: profile.id
                        }
                    ]
                },
                members: {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN
                        }
                    ]
                }
            },
            include: {
                members: true
            }
        })

    }

    async getServer(id: number, email: string) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                email
            }
        })
        if (!profile) throw new BadRequestException('Profile not found')

        const server = await this.prisma.server.findUnique({
            where: {
                id,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                channels: true,
                members: true
            }
        })

        if (!server) throw new BadRequestException('Server not found')
        return server
    }

    async getServerByProfileEmailOfMember(email: string) {
        return await this.prisma.server.findMany({
            where: {
                members: {
                    some: {
                        profile: {
                            email
                        }
                    }
                }
            },
            include: {
                channels: true
            }
        })
    }

    async updateServerWithNewInviteCode(id: number) {
        const server = await this.prisma.server.findUnique({
            where: {
                id
            }
        })
        if (!server) throw new BadRequestException('Server not found')

        return await this.prisma.server.update({
            where: {
                id
            },
            data: {
                inviteCode: uuidv4()
            }
        })
    }

    async updateServer(input: UpdateServerDto, imageUrl: string) {
        const server = await this.prisma.server.findUnique({
            where: {
                id: input.serverId
            }
        })
        if (!server) throw new BadRequestException('Server not found')
        return await this.prisma.server.update({
            where: {
                id: input.serverId
            },
            data: {
                name: input.name,
                imageUrl: imageUrl ? imageUrl : server.imageUrl
            }
        })
    }

    async createChannel(input: CreateChannelOnServerDto, email: string) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                email
            }
        })
        if (!profile) throw new BadRequestException('Profile not found')
        return await this.prisma.server.update({
            where: {
                id: input.serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.MODDERATOR, MemberRole.ADMIN],
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        name: input.name,
                        profileId: profile.id,
                        type: ChannelType[input.type]
                    }
                }
            },
            include: {
                members: true
            }
        })
    }

    async leaveServer(serverId: number, email: string) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                email
            }
        })
        if (!profile) throw new BadRequestException('Profile not found')
        return await this.prisma.server.update({
            where: {
                id: serverId
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        })
    }

    async deleteChannelFromServer(channelId: number, email: string) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                email
            }
        })
        if (!profile) throw new BadRequestException('Profile not found')
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: channelId,
                profileId: profile.id,
                NOT: {
                    name: 'general'
                }
            }
        })
        if (!channel) throw new BadRequestException('Channel not found')

        return await this.prisma.channel.delete({
            where: {
                id: channelId
            }
        })
    }

    async deleteServer(serverId: number, email: string) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                email
            }
        })
        if (!profile) throw new BadRequestException('Profile not found')
        const server = await this.prisma.server.findUnique({
            where: {
                id: serverId,
                profileId: profile.id,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN]
                        }
                    }
                }
            }
        })
        if (!server) throw new BadRequestException('Server not found')
        return this.prisma.server.delete({
            where: {
                id: serverId
            }
        })
    }


}
