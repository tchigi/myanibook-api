import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ChangeUserInfoDto} from "./dto/change-user-info.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {UsersInfo} from "./users-info.model";
import {UsersInfoConnectiveService} from "./users-info-connective/users-info-connective.service";

@Injectable()
export class UsersInfoService {

    constructor(@InjectModel(UsersInfo) private usersInfoRepository: typeof UsersInfo,
                private fileService: FilesService,
                private usersInfoConnectiveService: UsersInfoConnectiveService) {
    }

    async changeNickname(dto: ChangeUserInfoDto) {
        let info = await this.usersInfoRepository.findOne({ where: { userId: dto.userId } })
        if (!info) {
            info = await this.usersInfoRepository.create()
            info.userId = dto.userId
            await info.$set('users', [dto.userId])
        }
        const nickname = await this.usersInfoRepository.findOne({ where: { nickname: dto.value } })

        if (nickname) {
            throw new HttpException('This nickname is already in use', HttpStatus.BAD_REQUEST)
        }

        info.nickname = dto.value

        await info.save()
        return info
    }

    async changeAnimeList(dto: ChangeUserInfoDto) {
        let info = await this.usersInfoRepository.findOne({ where: { userId: dto.userId } })
        if (!info) {
            info = await this.usersInfoRepository.create()
            info.userId = dto.userId
            await info.$set('users', [dto.userId])
        }

        info.animeList = dto.value

        await info.save()
        return info
    }

    async changeAnimeDayOfAdditionList(dto: ChangeUserInfoDto) {
        let info = await this.usersInfoRepository.findOne({ where: { userId: dto.userId } })
        if (!info) {
            info = await this.usersInfoRepository.create()
            info.userId = dto.userId
            await info.$set('users', [dto.userId])
        }

        info.animeDayOfAdditionList = dto.value

        await info.save()
        return info
    }

    async changeAvatar(dto: ChangeUserInfoDto, image: any) {
        let info = await this.usersInfoRepository.findOne({ where: { userId: dto.userId } })
        if (!info) {
            info = await this.usersInfoRepository.create()
            info.userId = dto.userId
            await info.$set('users', [dto.userId])
        }

        const fileName = await this.fileService.createFile(image)
        info.avatar = fileName

        await info.save()
        return info
    }

    async createUserInfo() {
        const info = await this.usersInfoRepository.create()
        return info
    }

    async addUserId(id) {
        const x = await this.usersInfoConnectiveService.getId(id)
        const info = await this.usersInfoRepository.findOne({ where: { id: x.usersInfoId }})
        info.userId = x.userId
        await info.save()
        return info
    }

    async getUserInfoById(id) {
        const user = await this.usersInfoRepository.findOne({where:{userId: id}, include: {all: true}})
        return user
    }

    async getAllUsersInfo() {
        const usersInfo = await this.usersInfoRepository.findAll({include: {all: true}})
        return usersInfo
    }
}
