import {Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersInfoService} from "./users-info.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ChangeNicknameDto} from "./dto/change-nickname.dto";
import {AddAnimeEntryDto} from "./dto/add-anime-entry.dto";
import {RemoveAnimeEntryDto} from "./dto/remove-anime-entry.dto";
import {UsersInfo} from "./users-info.model";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users-info')
@Controller('users-info')
export class UsersInfoController {
    constructor(private usersInfoService: UsersInfoService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: 'Изменить никнейм'})
    @ApiResponse({status: 201, type: UsersInfo})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/nickname')
    changeNickname(@Body() dto: ChangeNicknameDto, @Req() req){
        return this.usersInfoService.changeNickname(dto, req.user.id)
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'Добавить аниме в список'})
    @ApiResponse({status: 201, type: UsersInfo})
    @ApiResponse({status: 409, description: 'Аниме уже есть в списке'})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/anime-list')
    addAnimeEntry(@Body() dto: AddAnimeEntryDto, @Req() req){
        return this.usersInfoService.addAnimeEntry(dto, req.user.id)
    }

    @ApiBearerAuth()
    @ApiOperation({summary: 'Удалить аниме из списка'})
    @ApiResponse({status: 200, type: UsersInfo})
    @ApiResponse({status: 404, description: 'Аниме не найдено в списке'})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Delete('/anime-list')
    removeAnimeEntry(@Body() dto: RemoveAnimeEntryDto, @Req() req){
        return this.usersInfoService.removeAnimeEntry(dto, req.user.id)
    }

    @ApiBearerAuth()
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

    @ApiBearerAuth()
    @ApiOperation({summary: 'Получить информацию о всех пользователях'})
    @ApiResponse({status: 200, type: [UsersInfo]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersInfoService.getAllUsersInfo()
    }
}
