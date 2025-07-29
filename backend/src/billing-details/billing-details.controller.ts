import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { BillingDetailsService } from './billing-details.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateBillingDetailDto } from './dto/create-billing-detail.dto';
import { UpdateBillingDetailDto } from './dto/update-billing-detail.dto';
import { User } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('billing-details')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BillingDetailsController {
  constructor(private readonly billingDetailsService: BillingDetailsService) {}

  @Get()
  findForUser(@CurrentUser() user: User) {
    return this.billingDetailsService.findByUserId(user.id);
  }

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() createDto: CreateBillingDetailDto,
  ) {
    return this.billingDetailsService.create(createDto, user.id);
  }

  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateDto: UpdateBillingDetailDto,
  ) {
    return this.billingDetailsService.updateByUser(user.id, updateDto);
  }
}