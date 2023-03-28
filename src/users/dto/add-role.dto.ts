import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddRoleDto {
    @ApiProperty({example: 'USER', description: 'Role'})
    @IsString({message: 'Should be a string'})
    readonly value: string;

    @ApiProperty({example: 1, description: 'User id'})
    @IsNumber({},{message: 'Should be a number'})
    readonly userId: number;
}
