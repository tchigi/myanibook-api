import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({example: 'Мой первый пост', description: 'Заголовок поста'})
    readonly title: string

    @ApiProperty({example: 'Содержимое поста...', description: 'Текст поста'})
    readonly content: string

    @ApiProperty({example: 1, description: 'ID автора'})
    readonly userId: number
}
