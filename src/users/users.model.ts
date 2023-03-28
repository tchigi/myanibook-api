import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";
import {UsersInfo} from "../users-info/users-info.model";
import {UsersInfoConnectiveModel} from "../users-info/users-info-connective/users-info-connective.model";

interface UserCreationAttrs {
    email: string,
    password: string
}
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Banned or not'})
    @Column({type: DataType.BOOLEAN , defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'spam', description: 'Ban reason'})
    @Column({type: DataType.STRING , allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[]

    @BelongsToMany(() => UsersInfo, () => UsersInfoConnectiveModel)
    userInfo: UsersInfo[];
}
