import {ApiProperty} from "@nestjs/swagger";
import {IsInt, Min} from "class-validator";

export class RemoveAnimeEntryDto {
    @ApiProperty({example: 20, description: 'ID аниме для удаления'})
    @IsInt({message: 'id должен быть целым числом'})
    @Min(1)
    readonly id: number;
}
