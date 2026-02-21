import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Post as PostModel} from "./posts.model";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {
    }

    @ApiOperation({summary: 'Создать пост'})
    @ApiResponse({status: 200, type: PostModel})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto:CreatePostDto, @UploadedFile() image) {
        return  this.postService.create(dto, image)
    }

}
