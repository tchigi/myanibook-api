import {forwardRef, Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.model";
import {FilesModule} from "../files/files.module";
import {UsersInfo} from "../users-info/users-info.model";
import {UsersInfoModule} from "../users-info/users-info.module";
import {UsersInfoConnectiveModel} from "../users-info/users-info-connective/users-info-connective.model";


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Post, UsersInfo, UsersInfoConnectiveModel]),
        RolesModule,
        forwardRef(()=> AuthModule),
        FilesModule,
        UsersInfoModule
    ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
