import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../users/users.model";
import {UsersInfo} from "../users-info.model";

@Table({tableName: 'users-info-connective', createdAt: false, updatedAt: false})
export class UsersInfoConnectiveModel extends Model<UsersInfoConnectiveModel> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => UsersInfo)
    @Column({type: DataType.INTEGER})
    usersInfoId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
}
