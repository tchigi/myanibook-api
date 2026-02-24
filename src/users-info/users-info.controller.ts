import {Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersInfoService} from "./users-info.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ChangeUserInfoDto} from "./dto/change-user-info.dto";
import {UsersInfo} from "./users-info.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users-info')
@Controller('users-info')
export class UsersInfoController {
    constructor(private usersInfoService: UsersInfoService) {}

    @ApiOperation({summary: 'Изменить никнейм'})
    @ApiResponse({status: 201, type: UsersInfo})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/nickname')
    changeNickname(@Body() userInfoDto: ChangeUserInfoDto, @Req() req){
        return this.usersInfoService.changeNickname(userInfoDto, req.user.id)
    }

    @ApiOperation({summary: 'Изменить список аниме'})
    @ApiResponse({status: 201, type: UsersInfo})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/anime-list')
    changeAnimeList(@Body() userInfoDto: ChangeUserInfoDto, @Req() req){
        return this.usersInfoService.changeAnimeList(userInfoDto, req.user.id)
    }

    @ApiOperation({summary: 'Изменить аватар', description: 'Изображение: не более 500 КБ'})
    @ApiResponse({status: 201, type: UsersInfo})
    @ApiConsumes('multipart/form-data')
    @UseGuards(JwtAuthGuard)
    @Post('/avatar')
    @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 500 * 1024 } }))
    changeAvatar(@Req() req, @UploadedFile() image){
        return this.usersInfoService.changeAvatar(req.user.id, image)
    }

    @ApiOperation({summary: 'Получить информацию о пользователе'})
    @ApiResponse({status: 200, type: UsersInfo})
    @Get(`/:value`)
    getInfo(@Param('value') value: number){
        return this.usersInfoService.getUserInfoById(value)
    }

    @ApiOperation({summary: 'Получить информацию о всех пользователях'})
    @ApiResponse({status: 200, type: [UsersInfo]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersInfoService.getAllUsersInfo()
    }
}
