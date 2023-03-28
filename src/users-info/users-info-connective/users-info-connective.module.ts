import { Module } from '@nestjs/common';
import {UsersInfoConnectiveService} from "./users-info-connective.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../../users/users.model";
import {UsersInfo} from "../users-info.model";
import {UsersInfoConnectiveModel} from "./users-info-connective.model";

@Module({
    providers: [UsersInfoConnectiveService],
    exports: [UsersInfoConnectiveService],
    imports: [
        SequelizeModule.forFeature([User, UsersInfo, UsersInfoConnectiveModel]),
    ]
})
export class UsersInfoConnectiveModule {}
