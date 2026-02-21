import {ApiProperty} from "@nestjs/swagger";

export class ChangeUserInfoDto {
    @ApiProperty({example: 1, description: 'User id'})
    readonly userId: number;
    @ApiProperty({example: ['Naruto', 'Bleach'], description: 'Info value — строка для nickname/avatar, массив строк для anime-list'})
    readonly value: string | string[]
}
