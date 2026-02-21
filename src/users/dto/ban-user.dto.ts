import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class BanUserDto {
    @ApiProperty({example: 1, description: 'User id'})
    @IsNumber({}, {message: 'Should be a number'})
    readonly userId: number;

    @ApiProperty({example: 'spam', description: 'Ban reason'})
    @IsString({message: 'Should be a string'})
    @IsNotEmpty({message: 'Ban reason should not be empty'})
    readonly banReason: string
}
