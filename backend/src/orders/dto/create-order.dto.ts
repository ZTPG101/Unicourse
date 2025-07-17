import { IsNumber } from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  billingDetailsId: number;
}
