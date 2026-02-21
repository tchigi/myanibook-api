import {Body, Controller, Post} from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Вход в аккаунт'})
    @ApiResponse({status: 200, description: 'Возвращает JWT-токен'})
    @ApiResponse({status: 401, description: 'Неверный email или пароль'})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация нового пользователя'})
    @ApiResponse({status: 200, description: 'Возвращает JWT-токен'})
    @ApiResponse({status: 400, description: 'Пользователь с таким email уже существует'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

}
