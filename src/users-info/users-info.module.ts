import {forwardRef, Module} from '@nestjs/common';
import { UsersInfoController } from './users-info.controller';
import { UsersInfoService } from './users-info.service';
import {FilesModule} from "../files/files.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {UsersInfo} from "./users-info.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UsersInfoController],
  providers: [UsersInfoService],
  exports: [UsersInfoService],
  imports: [
    SequelizeModule.forFeature([User, UsersInfo]),
    FilesModule,
    forwardRef(() => AuthModule),
  ]
})
export class UsersInfoModule {}
