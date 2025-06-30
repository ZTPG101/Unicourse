import { IsNumber, Max, Min } from "@nestjs/class-validator";

export class UpdateProgressDto {
    @IsNumber()
    @Min(0)
    @Max(100)
    progress: number
}