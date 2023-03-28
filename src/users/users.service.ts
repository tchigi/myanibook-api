import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {FilesService} from "../files/files.service";
import {UsersInfoService} from "../users-info/users-info.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService,
                private fileService: FilesService,
                private usersInfoService: UsersInfoService) {
    }

    async createUser(dto: CreateUserDto) {
        console.log(dto)
        const user = await this.userRepository.create(dto)

        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]

        const info = await this.usersInfoService.createUserInfo()
        await user.$set('userInfo', info)

        console.log(user.id, '11111111111111111111111111111111111111111')
        await this.usersInfoService.addUserId(user.id)

        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({where:{email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if(role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
    }


    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = dto.banReason
        await user.save()
        return user
    }

}
