import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  billingDetailsId: number;
  
  @IsString()
  @IsOptional()
  paypalOrderId?: string;
}
