import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {HealthController} from "./health/health.controller";
import {UsersModule} from "./users/users.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
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
    controllers: [HealthController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                dialect: 'postgres',
                host: config.get('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get('DB_USER'),
                password: config.get('DB_PASSWORD'),
                database: config.get('DB_NAME'),
                models: [User, Role, UserRoles, Post, UsersInfo],
                autoLoadModels: false,
                synchronize: false,
                logging: false,
                dialectOptions: {
                    ssl: true,
                },
            }),
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
