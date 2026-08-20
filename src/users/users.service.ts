import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException(
        'El correo electrónico ya está registrado',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    await this.userRepository.update(
      id,
      updateUserDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(
        'Usuario no encontrado',
      );
    }

    await this.userRepository.delete(id);

    return {
      message: 'Usuario eliminado correctamente',
    };
  }
}