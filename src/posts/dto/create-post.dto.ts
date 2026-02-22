import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: 'Мой первый пост', description: 'Заголовок поста'})
    @IsString({message: 'Should be a string'})
    @IsNotEmpty({message: 'Title should not be empty'})
    readonly title: string

    @ApiProperty({example: 'Содержимое поста...', description: 'Текст поста'})
    @IsString({message: 'Should be a string'})
    @IsNotEmpty({message: 'Content should not be empty'})
    readonly content: string
}
