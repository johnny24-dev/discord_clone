import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.types';
import { CreateProfileDto } from './dto';
import { PrismaService } from 'src/prisma.service';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class ProfileResolver {

    constructor(
        private readonly prisma: PrismaService,
        private readonly profileService: ProfileService
    ) { }

    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => Profile)
    async createProfile(
        @Args('input') input: CreateProfileDto
    ) {
        return await this.profileService.createProfile(input)
    }

    @Query(() => Profile)
    async getProfileById(
        @Args('profileId') profileId: number
    ) {
        return await this.profileService.getProfileById(profileId)
    }
}
