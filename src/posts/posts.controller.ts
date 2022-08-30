import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from '@nestjs/common';
import { PostModel } from './posts.interface';
import { PostsService } from './posts.service';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('posts')
@UseFilters(new HttpExceptionFilter()) 
@ApiTags('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    /**
     * findAll
     */
    @Get()
    @ApiOkResponse({ description: 'Posts retrieved successfully.' })
    public findAll(): Array<PostModel> {
        return this.postService.findAll();
    }


    @Get(':id')
    @ApiOkResponse({ description: 'Post retrieved successfully.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    public findOne(@Param('id', ParseIntPipe) id: number): PostModel {
        return this.postService.findOne(id);
    }


    @Post()
    @ApiCreatedResponse({ description: 'Post created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
    public create(@Body() post: PostModel): PostModel {
        return this.postService.create(post);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Post deleted successfully.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    public delete(@Param('id', ParseIntPipe) id: number): void {
        this.postService.delete(id);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Post updated successfully.' })
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
    public update(@Param('id', ParseIntPipe) id: number, @Body() post: PostModel): PostModel {
        return this.postService.update(id, post);
    }


}
