import { IsNotEmpty, IsNumber, IsString, Min } from "@nestjs/class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @Min(0)
    price: number

    @IsString()
    category: string
}
