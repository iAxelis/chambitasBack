import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserSkill } from './entities/user-skill.entity';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectRepository(UserSkill)
    private readonly userSkillRepository: Repository<UserSkill>,
  ) {}

  async create(createUserSkillDto: CreateUserSkillDto) {
    const existingUserSkill = await this.userSkillRepository.findOne({
      where: {
        userId: createUserSkillDto.userId,
        skillId: createUserSkillDto.skillId,
      },
    });

    if (existingUserSkill) {
      throw new ConflictException(
        'El usuario ya tiene asignada esta habilidad',
      );
    }

    const userSkill = this.userSkillRepository.create(createUserSkillDto);

    return this.userSkillRepository.save(userSkill);
  }

  async findAll() {
    return this.userSkillRepository.find();
  }

  async findOne(id: number) {
    const userSkill = await this.userSkillRepository.findOne({
      where: { id },
    });

    if (!userSkill) {
      throw new NotFoundException('Relación usuario-habilidad no encontrada');
    }

    return userSkill;
  }

  async remove(id: number) {
    const userSkill = await this.findOne(id);

    await this.userSkillRepository.delete(id);

    return {
      message: 'Habilidad eliminada del usuario correctamente',
    };
  }
}
