import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: 1, description: 'User id'})
    readonly userId: number;

    @ApiProperty({example: 'spam', description: 'Ban reason'})
    readonly banReason: string
}
