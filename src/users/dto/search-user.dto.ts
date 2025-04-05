import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto"

export class SearchUserDto extends PaginationQueryDto {
  @ApiProperty({
    description: "Search term for user name",
    required: false,
    example: "John",
  })
  @IsOptional()
  @IsString()
  search?: string
}

