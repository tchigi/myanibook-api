import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ChangeUserInfoDto} from "./dto/change-user-info.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {UsersInfo} from "./users-info.model";

@Injectable()
export class UsersInfoService {

    constructor(@InjectModel(UsersInfo) private usersInfoRepository: typeof UsersInfo,
                private fileService: FilesService) {
    }

    async changeNickname(dto: ChangeUserInfoDto, userId: number) {
        let info = await this.usersInfoRepository.findOne({ where: { userId } })
        if (!info) {
            info = await this.usersInfoRepository.create({ userId })
        }
        const nickname = await this.usersInfoRepository.findOne({ where: { nickname: dto.value } })

        if (nickname) {
            throw new HttpException('This nickname is already in use', HttpStatus.BAD_REQUEST)
        }

        info.nickname = dto.value as string

        await info.save()
        return info
    }

    async changeAnimeList(dto: ChangeUserInfoDto, userId: number) {
        let info = await this.usersInfoRepository.findOne({ where: { userId } })
        if (!info) {
            info = await this.usersInfoRepository.create({ userId })
        }

        info.animeList = dto.value as string[]

        await info.save()
        return info
    }

    async changeAnimeDayOfAdditionList(dto: ChangeUserInfoDto, userId: number) {
        let info = await this.usersInfoRepository.findOne({ where: { userId } })
        if (!info) {
            info = await this.usersInfoRepository.create({ userId })
        }

        info.animeDayOfAdditionList = dto.value as string[]

        await info.save()
        return info
    }

    async changeAvatar(dto: ChangeUserInfoDto, userId: number, image: any) {
        let info = await this.usersInfoRepository.findOne({ where: { userId } })
        if (!info) {
            info = await this.usersInfoRepository.create({ userId })
        }

        const fileName = await this.fileService.createFile(image)
        info.avatar = fileName

        await info.save()
        return info
    }

    async initUserInfo(userId: number) {
        return this.usersInfoRepository.create({ userId })
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
