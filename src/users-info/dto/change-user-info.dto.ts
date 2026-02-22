import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class ChangeUserInfoDto {
    @ApiProperty({example: [{id: 20, addedAt: '2024-01-01'}], description: 'Значение: строка для nickname/avatar, массив объектов {id, addedAt} для anime-list'})
    @IsNotEmpty({message: 'Value should not be empty'})
    readonly value: string | string[]
}
