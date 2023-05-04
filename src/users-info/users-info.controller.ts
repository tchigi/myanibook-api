import {Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {UsersInfoService} from "./users-info.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ChangeUserInfoDto} from "./dto/change-user-info.dto";
import {UsersInfo} from "./users-info.model";

@ApiTags('Users-info')
@Controller('users-info')
export class UsersInfoController {
    constructor(private usersInfoService: UsersInfoService) {}

    @ApiOperation({summary: 'Change nickname'})
    @ApiResponse({status: 200, type: UsersInfo})
    @Post('/nickname')
    changeNickname(@Body() userInfoDto: ChangeUserInfoDto){
        return this.usersInfoService.changeNickname(userInfoDto)
    }

    @ApiOperation({summary: 'Change anime list'})
    @ApiResponse({status: 200, type: UsersInfo})
    @Post('/anime-list')
    changeAnimeList(@Body() userInfoDto: ChangeUserInfoDto){
        return this.usersInfoService.changeAnimeList(userInfoDto)
    }

    @ApiOperation({summary: 'Change anime day of addition list'})
    @ApiResponse({status: 200, type: UsersInfo})
    @Post('/anime-day-of-addition-list')
    changeAnimeDayOfAdditionList(@Body() userInfoDto: ChangeUserInfoDto){
        return this.usersInfoService.changeAnimeDayOfAdditionList(userInfoDto)
    }

    @ApiOperation({summary: 'Change avatar'})
    @ApiResponse({status: 200, type: UsersInfo})
    @Post('/avatar')
    @UseInterceptors(FileInterceptor('image'))
    changeAvatar(@Body() userInfoDto:ChangeUserInfoDto, @UploadedFile() image){
        return this.usersInfoService.changeAvatar(userInfoDto, image)
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
