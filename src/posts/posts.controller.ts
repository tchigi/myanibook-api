import {Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Post as PostModel} from "./posts.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {
    }

    @ApiOperation({summary: 'Создать пост', description: 'Изображение: не более 1 МБ'})
    @ApiResponse({status: 201, type: PostModel})
    @ApiConsumes('multipart/form-data')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 1 * 1024 * 1024 } }))
    createPost(@Body() dto:CreatePostDto, @Req() req, @UploadedFile() image) {
        return  this.postService.create(dto, image, req.user.id)
    }

}
