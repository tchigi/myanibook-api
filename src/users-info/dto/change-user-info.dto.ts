import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class ChangeUserInfoDto {
    @ApiProperty({example: ['Naruto', 'Bleach'], description: 'Info value — строка для nickname/avatar, массив строк для anime-list'})
    @IsNotEmpty({message: 'Value should not be empty'})
    readonly value: string | string[]
}
