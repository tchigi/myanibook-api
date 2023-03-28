import {ApiProperty} from "@nestjs/swagger";

export class ChangeUserInfoDto {
    @ApiProperty({example: 1, description: 'User id'})
    readonly userId: number;
    @ApiProperty({example: 'test', description: 'Info value'})
    readonly value: string
}
