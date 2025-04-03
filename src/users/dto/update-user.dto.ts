import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends OmitType(User, ['password', 'id', 'createdAt', 'updatedAt',]) {
  @ApiProperty()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'Nome deve conter apenas letras',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty({ message: 'Matrícula é obrigatória' })
  @Matches(/^[0-9]+$/, { message: 'Matrícula deve conter apenas números' })
  matricula: string;
}
