import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class ChangeNicknameDto {
    @ApiProperty({example: 'Ichigo', description: 'Новый никнейм пользователя'})
    @IsNotEmpty({message: 'Value should not be empty'})
    @IsString({message: 'Value should be a string'})
    readonly value: string
}