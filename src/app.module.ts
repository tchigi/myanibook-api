import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/users.model";
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {RolesModule} from "./roles/roles.module";
import {AuthModule} from "./auth/auth.module";
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { UsersInfoModule } from './users-info/users-info.module';
import * as path from "path";
import {UsersInfo} from "./users-info/users-info.model";
import {UsersInfoConnectiveModel} from "./users-info/users-info-connective/users-info-connective.model";
import {UsersInfoConnectiveModule} from "./users-info/users-info-connective/users-info-connective.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'containers-us-west-91.railway.app',
            port: 7567,
            username: 'postgres',
            password: 'A2SfDpbIe3GOMphiLtCz',
            database: 'railway',
            models: [User, Role, UserRoles, Post, UsersInfo, UsersInfoConnectiveModel],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        UsersInfoModule,
        UsersInfoConnectiveModule
    ]
})
export class AppModule {}
