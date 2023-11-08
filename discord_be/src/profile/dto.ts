import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateProfileDto {

    @IsString()
    @IsNotEmpty()

    @Field()
    name: string

    @IsString()
    @IsEmail()

    @Field()
    email: string

    @IsString()
    @IsNotEmpty()
    @Field()
    imageUrl: string
}