import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const existingSkill =
      await this.skillRepository.findOne({
        where: {
          name: createSkillDto.name,
        },
      });

    if (existingSkill) {
      throw new ConflictException(
        'La habilidad ya existe',
      );
    }

    const skill =
      this.skillRepository.create(
        createSkillDto,
      );

    return this.skillRepository.save(skill);
  }

  async findAll() {
    return this.skillRepository.find();
  }

  async findOne(id: number) {
    const skill =
      await this.skillRepository.findOne({
        where: { id },
      });

    if (!skill) {
      throw new NotFoundException(
        'Habilidad no encontrada',
      );
    }

    return skill;
  }

  async update(
    id: number,
    updateSkillDto: UpdateSkillDto,
  ) {
    const skill = await this.findOne(id);

    await this.skillRepository.update(
      id,
      updateSkillDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    const skill = await this.findOne(id);

    await this.skillRepository.delete(id);

    return {
      message: 'Habilidad eliminada correctamente',
    };
  }
}