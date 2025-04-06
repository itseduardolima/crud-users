import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { paginate, type Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUserByEmail) {
      throw new ConflictException('O e-mail já existe');
    }

    const existingUserByMatricula = await this.usersRepository.findOne({
      where: { matricula: createUserDto.matricula },
    });

    if (existingUserByMatricula) {
      throw new ConflictException('Matrícula já existe');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findAll(options: SearchUserDto): Promise<Pagination<User>> {
    const { search, page, limit } = options;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    queryBuilder.select([
      'user.id',
      'user.name',
      'user.email',
      'user.matricula',
      'user.isActive',
      'user.createdAt',
      'user.updatedAt',
    ]);

    if (search) {
      queryBuilder.where('user.name LIKE :searchTerm', {
        searchTerm: `%${search}%`,
      });
    }

    queryBuilder.orderBy('user.createdAt', 'DESC');

    return paginate<User>(queryBuilder, { page, limit, route: '/users' });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'matricula',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email já existe');
      }
    }

    if (updateUserDto.matricula && updateUserDto.matricula !== user.matricula) {
      const existingUser = await this.usersRepository.findOne({
        where: { matricula: updateUserDto.matricula },
      });

      if (existingUser) {
        throw new ConflictException('Matrícula já existe');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
  }
}
