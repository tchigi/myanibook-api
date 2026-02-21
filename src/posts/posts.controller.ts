import {Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
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

    @ApiOperation({summary: 'Создать пост'})
    @ApiResponse({status: 200, type: PostModel})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto:CreatePostDto, @Req() req, @UploadedFile() image) {
        return  this.postService.create(dto, image, req.user.id)
    }

}
