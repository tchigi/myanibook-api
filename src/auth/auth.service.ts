import { HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcript from "bcryptjs"
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login( userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration( userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('A user with the same email already exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcript.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        if (!user) {
            throw new UnauthorizedException({message: 'Incorrect email or password'})
        }
        const passwordEquals = await bcript.compare(userDto.password, user.password)
        if (!passwordEquals) {
            throw new UnauthorizedException({message: 'Incorrect email or password'})
        }
        return user
    }
}

