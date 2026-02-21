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

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User, Role, UserRoles, Post, UsersInfo],
            autoLoadModels: true,
            synchronize: false,
            logging: false,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        UsersInfoModule,
    ]
})
export class AppModule {}
