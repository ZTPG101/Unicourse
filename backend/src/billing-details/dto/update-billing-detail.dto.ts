import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingDetailDto } from './create-billing-detail.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBillingDetailDto extends PartialType(
  CreateBillingDetailDto,
) {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
