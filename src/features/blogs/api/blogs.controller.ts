import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { BlogCreateModel } from './models/input/create-blog.input.model';
import { BlogOutputModel } from './models/output/blog.output.model';
import { BlogsService } from '../application/blogs.service';
import { NumberPipe } from '../../../common/pipes/number.pipe';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { Request, Response } from 'express';
import { BlogsQueryRepository } from '../infrastructure/blogs.query-repository';

@ApiTags('Blogs')
@Controller('blogs')
// @UseGuards(AuthGuard)
export class BlogsController {
  blogsService: BlogsService;
  constructor(
    blogsService: BlogsService,
    private readonly blogsQueryRepository: BlogsQueryRepository,
  ) {
    this.blogsService = blogsService;
  }

  @Get()
  async hello(
    @Query('id', NumberPipe) id: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    id;
    req;
    res;
    return 'Hello';
  }

  @Post()
  @HttpCode(200)
  async create(
    @Body() createModel: BlogCreateModel,
  ): Promise<BlogOutputModel | null> {
    const result = await this.blogsService.create(
      createModel.email,
      createModel.name,
    );

    return this.blogsQueryRepository.getById(result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return id;
  }
}
