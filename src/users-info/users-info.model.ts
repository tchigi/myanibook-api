import { BelongsToMany, Column, DataType, ForeignKey,  Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UsersInfoConnectiveModel} from "./users-info-connective/users-info-connective.model";

interface UsersInfoCreationAttrs {
}
@Table({tableName: 'users-info', updatedAt: false, createdAt: false})
export class UsersInfo extends Model<UsersInfo, UsersInfoCreationAttrs> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'nickname',  description: 'User nickname'})
    @Column({type: DataType.STRING , allowNull: true, unique: true})
    nickname: string;

    @ApiProperty({example: 'test.jpg', description: 'User avatar'})
    @Column({type: DataType.STRING , allowNull: true})
    avatar: string;

    @ApiProperty({example: 'test', description: 'User anime list'})
    @Column({type: DataType.STRING , allowNull: true})
    animeList: string;

    @ApiProperty({example: 'test', description: 'User anime day of addition list'})
    @Column({type: DataType.STRING , allowNull: true})
    animeDayOfAdditionList: string;

    @ApiProperty({example: '1', description: 'User ID'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsToMany(() => User, () => UsersInfoConnectiveModel)
    users: User[];

}
