import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsInt, Min, Max } from "class-validator"
import { Type } from "class-transformer"

export class PaginationQueryDto {
  @ApiProperty({
    description: "Page number (starts from 1)",
    default: 1,
    required: false,
    type: Number,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be at least 1" })
  page?: number = 1

  @ApiProperty({
    description: "Number of items per page",
    default: 10,
    required: false,
    type: Number,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Limit must be an integer" })
  @Min(1, { message: "Limit must be at least 1" })
  @Max(100, { message: "Limit must not exceed 100" })
  limit?: number = 10
}