import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateServerDto {
    @IsString()
    @Field()
    name: string

    @Field()
    profileId: number

}


@InputType()
export class UpdateServerDto {
    @IsString()
    @IsNotEmpty()
    @Field()
    name: string

    @IsInt()
    @Field()
    serverId: number
}

@InputType()
export class CreateChannelOnServerDto{
    @IsString()
    @Field()
    name:string

    @IsInt()
    @Field()
    serverId:number

    @IsString()
    @Field()
    type:string

}