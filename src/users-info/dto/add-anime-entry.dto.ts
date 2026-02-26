import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsInt, IsOptional, IsDateString, Min} from "class-validator";

export class AddAnimeEntryDto {
    @ApiProperty({example: 20, description: 'ID аниме'})
    @IsInt({message: 'id должен быть целым числом'})
    @Min(1)
    readonly id: number;

    @ApiPropertyOptional({example: '2024-01-01', description: 'Дата добавления (ISO 8601). По умолчанию — сегодня'})
    @IsOptional()
    @IsDateString({}, {message: 'addedAt должен быть датой в формате ISO 8601'})
    readonly addedAt?: string;
}
