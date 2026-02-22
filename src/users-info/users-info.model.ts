import { BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

export interface AnimeEntry {
    id: number;
    addedAt: string;
}

interface UsersInfoCreationAttrs {
    userId: number;
}
@Table({tableName: 'users_info', updatedAt: false, createdAt: false})
export class UsersInfo extends Model<UsersInfo, UsersInfoCreationAttrs> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'nickname',  description: 'Никнейм пользователя'})
    @Column({type: DataType.STRING , allowNull: true, unique: true})
    nickname: string;

    @ApiProperty({example: 'test.jpg', description: 'Аватар пользователя'})
    @Column({type: DataType.STRING , allowNull: true})
    avatar: string;

    @ApiProperty({example: '[{"id": 20, "addedAt": "2024-01-01"}]', description: 'Список аниме пользователя'})
    @Column({type: DataType.JSON , allowNull: true})
    animeList: AnimeEntry[];

    @ApiProperty({example: '1', description: 'ID пользователя'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User)
    user: User;

}
