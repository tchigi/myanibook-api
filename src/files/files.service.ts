import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from "path";
import * as fs from 'fs'
import * as uuid from 'uuid'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MIME_TO_EXT: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
}

@Injectable()
export class FilesService {

    async createFile(file): Promise<string> {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new HttpException('Invalid file type. Allowed: jpeg, png, webp', HttpStatus.BAD_REQUEST)
        }
        try {
            const ext = MIME_TO_EXT[file.mimetype]
            const fileName = uuid.v4() + ext
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (e) {
            throw new HttpException('An error occurred while writing the file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    deleteFile(fileName: string): void {
        const filePath = path.join(path.resolve(__dirname, '..', 'static'), fileName)
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
    }
}
