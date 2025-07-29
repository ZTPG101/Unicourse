import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { AdminOrInstructor } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InstructorsService } from './instructors.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/database/entities/user.entity';
import { InstructorOwnerOrAdminGuard } from 'src/auth/guards/instructor-or-admin.guard';

@Controller('instructors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @Public()
  @Get()
  findAll() {
    return this.instructorsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorsService.findById(+id);
  }

  
  @Post()
  @AdminOrInstructor()
  create(
    @Body() createInstructorDto: CreateInstructorDto,
    @CurrentUser() user: User
  ) {
    return this.instructorsService.create(createInstructorDto, user);
  }

  @Patch(':id')
  @UseGuards(InstructorOwnerOrAdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorsService.update(id, updateInstructorDto);
  }

  @Delete(':id')
  @UseGuards(InstructorOwnerOrAdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.instructorsService.remove(id);
  }
}
