import { Module } from '@nestjs/common';
import { UsersInfoController } from './users-info.controller';
import { UsersInfoService } from './users-info.service';
import {FilesModule} from "../files/files.module";
import {JwtModule} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {UsersInfo} from "./users-info.model";
import {UsersInfoConnectiveModel} from "./users-info-connective/users-info-connective.model";
import {UsersInfoConnectiveModule} from "./users-info-connective/users-info-connective.module";

@Module({
  controllers: [UsersInfoController],
  providers: [UsersInfoService],
  exports: [UsersInfoService],
  imports: [
    SequelizeModule.forFeature([User, UsersInfo, UsersInfoConnectiveModel]),
    FilesModule,
    JwtModule,
      UsersInfoConnectiveModule
  ]
})
export class UsersInfoModule {}
