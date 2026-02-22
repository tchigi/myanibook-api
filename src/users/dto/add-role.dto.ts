import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'USER', description: 'Значение роли'})
    @IsString({message: 'Should be a string'})
    readonly value: string;

    @ApiProperty({example: 1, description: 'ID пользователя'})
    @IsNumber({},{message: 'Should be a number'})
    readonly userId: number;
}
