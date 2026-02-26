import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ChangeNicknameDto} from "./dto/change-nickname.dto";
import {AddAnimeEntryDto} from "./dto/add-anime-entry.dto";
import {RemoveAnimeEntryDto} from "./dto/remove-anime-entry.dto";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {AnimeEntry, UsersInfo} from "./users-info.model";
import {UniqueConstraintError} from "sequelize";

@Injectable()
export class UsersInfoService {

    constructor(@InjectModel(UsersInfo) private usersInfoRepository: typeof UsersInfo,
                private fileService: FilesService) {
    }

    async changeNickname(dto: ChangeNicknameDto, userId: number) {
        const [info] = await this.usersInfoRepository.findOrCreate({ where: { userId }, defaults: { userId } })

        try {
            info.nickname = dto.value as string
            await info.save()
        } catch (e) {
            if (e instanceof UniqueConstraintError) {
                throw new HttpException('This nickname is already in use', HttpStatus.BAD_REQUEST)
            }
            throw e
        }

        return info
    }

    async addAnimeEntry(dto: AddAnimeEntryDto, userId: number) {
        const [info] = await this.usersInfoRepository.findOrCreate({ where: { userId }, defaults: { userId } })
        if (info.animeList.some(e => e.id === dto.id)) {
            throw new HttpException(`Аниме с id ${dto.id} уже есть в списке`, HttpStatus.CONFLICT)
        }

        const newEntry: AnimeEntry = {
            id: dto.id,
            addedAt: dto.addedAt ?? new Date().toISOString().split('T')[0],
        }
        info.animeList = [...info.animeList, newEntry]
        await info.save()
        return info
    }

    async removeAnimeEntry(dto: RemoveAnimeEntryDto, userId: number) {
        const [info] = await this.usersInfoRepository.findOrCreate({ where: { userId }, defaults: { userId } })
        if (!info.animeList.some(e => e.id === dto.id)) {
            throw new HttpException(`Аниме с id ${dto.id} не найдено в списке`, HttpStatus.NOT_FOUND)
        }

        info.animeList = info.animeList.filter(e => e.id !== dto.id)
        await info.save()
        return info
    }

    async changeAvatar(userId: number, image: any) {
        const [info] = await this.usersInfoRepository.findOrCreate({ where: { userId }, defaults: { userId } })

        const oldAvatar = info.avatar
        const fileName = await this.fileService.createFile(image)

        if (oldAvatar) {
            this.fileService.deleteFile(oldAvatar)
        }

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
