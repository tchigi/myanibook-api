import { Injectable } from '@nestjs/common';
import {UsersInfoConnectiveModel} from "./users-info-connective.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class UsersInfoConnectiveService {

    constructor(@InjectModel(UsersInfoConnectiveModel) private usersInfoConnectiveRepository: typeof UsersInfoConnectiveModel) {
    }

    async getId(value) {
        const id = this.usersInfoConnectiveRepository.findOne({ where: { userId: value }})
        return id
    }

}
