import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { AdminOrInstructor } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Category } from 'src/database/entities/category.entity';
import { CategoryService } from './categories.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findById(+id);
  }

  @Public()
  @Get('by-name/:name')
  async findByName(@Param('name') name: string): Promise<Category> {
    return this.categoryService.findByName(name);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrInstructor()
  async create(@Body() data: Partial<Category>): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrInstructor()
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrInstructor()
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.categoryService.remove(+id);
  }
}
