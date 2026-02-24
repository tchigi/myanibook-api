import {ApiProperty} from "@nestjs/swagger";
import {IsArray} from "class-validator";
import {AnimeEntry} from "../users-info.model";

export class ChangeAnimeListDto {
    @ApiProperty({example: [{id: 20, addedAt: '2024-01-01'}], description: 'Список аниме пользователя'})
    @IsArray({message: 'Value should be an array'})
    readonly value: AnimeEntry[]
}