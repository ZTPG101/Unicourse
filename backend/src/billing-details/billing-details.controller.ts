import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BillingDetailsService } from './billing-details.service';
import { CreateBillingDetailDto } from './dto/create-billing-detail.dto';
import { UpdateBillingDetailDto } from './dto/update-billing-detail.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { SelfOrAdminGuard } from 'src/auth/guards/self-admin.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../database/entities/user.entity';

@Controller('billing-details')
export class BillingDetailsController {
  constructor(private readonly billingDetailsService: BillingDetailsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  create(@CurrentUser() user: User, @Body() createBillingDetailDto: CreateBillingDetailDto) {
    return this.billingDetailsService.create(createBillingDetailDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  findAll() {
    return this.billingDetailsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  findOne(@Param('id') id: string) {
    return this.billingDetailsService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  update(@Param('id') id: string, @Body() updateBillingDetailDto: UpdateBillingDetailDto) {
    return this.billingDetailsService.update(Number(id), updateBillingDetailDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, SelfOrAdminGuard)
  remove(@Param('id') id: string) {
    return this.billingDetailsService.remove(Number(id));
  }
}
