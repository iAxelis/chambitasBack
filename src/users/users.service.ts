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
  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const email = createUserDto.email.trim().toLowerCase();

    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.saltRounds,
    );

    const user = this.userRepository.create({
      ...createUserDto,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    return this.removePassword(savedUser);
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();

    return users.map((user) => this.removePassword(user));
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.removePassword(user);
  }

  /**
   * Se mantiene la contraseña porque este método
   * puede ser utilizado por AuthService para validar el login.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: email.trim().toLowerCase(),
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const dataToUpdate: Partial<User> = {
      ...updateUserDto,
    };

    if (updateUserDto.email) {
      const email = updateUserDto.email.trim().toLowerCase();

      if (email !== user.email) {
        const existingUser = await this.findByEmail(email);

        if (existingUser && existingUser.id !== id) {
          throw new ConflictException(
            'El correo electrónico ya está registrado',
          );
        }
      }

      dataToUpdate.email = email;
    }

    if (updateUserDto.password) {
      dataToUpdate.password = await bcrypt.hash(
        updateUserDto.password,
        this.saltRounds,
      );
    }

    Object.assign(user, dataToUpdate);

    const updatedUser = await this.userRepository.save(user);

    return this.removePassword(updatedUser);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userRepository.remove(user);

    return {
      message: 'Usuario eliminado correctamente',
    };
  }

  private removePassword(user: User): Omit<User, 'password'> {
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
