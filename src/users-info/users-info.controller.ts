import {Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
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

    @ApiOperation({summary: 'Change nickname'})
    @ApiResponse({status: 200, type: UsersInfo})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/nickname')
    changeNickname(@Body() userInfoDto: ChangeUserInfoDto, @Req() req){
        return this.usersInfoService.changeNickname(userInfoDto, req.user.id)
    }

    @ApiOperation({summary: 'Change anime list'})
    @ApiResponse({status: 200, type: UsersInfo})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/anime-list')
    changeAnimeList(@Body() userInfoDto: ChangeUserInfoDto, @Req() req){
        return this.usersInfoService.changeAnimeList(userInfoDto, req.user.id)
    }

    @ApiOperation({summary: 'Change anime day of addition list'})
    @ApiResponse({status: 200, type: UsersInfo})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/anime-day-of-addition-list')
    changeAnimeDayOfAdditionList(@Body() userInfoDto: ChangeUserInfoDto, @Req() req){
        return this.usersInfoService.changeAnimeDayOfAdditionList(userInfoDto, req.user.id)
    }

    @ApiOperation({summary: 'Change avatar'})
    @ApiResponse({status: 200, type: UsersInfo})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/avatar')
    @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 500 * 1024 } }))
    changeAvatar(@Body() userInfoDto: ChangeUserInfoDto, @Req() req, @UploadedFile() image){
        return this.usersInfoService.changeAvatar(userInfoDto, req.user.id, image)
    }

    @ApiOperation({summary: `Get user's info`})
    @ApiResponse({status: 200, type: UsersInfo})
    @Get(`/:value`)
    getInfo(@Param('value') value: number){
        return this.usersInfoService.getUserInfoById(value)
    }

    @ApiOperation({summary: 'Get all users info'})
    @ApiResponse({status: 200, type: [UsersInfo]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersInfoService.getAllUsersInfo()
    }
}
