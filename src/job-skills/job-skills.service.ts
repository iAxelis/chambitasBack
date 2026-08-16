import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JobSkill } from './entities/job-skill.entity';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';

@Injectable()
export class JobSkillsService {
  constructor(
    @InjectRepository(JobSkill)
    private readonly jobSkillRepository: Repository<JobSkill>,
  ) {}

  async create(
    createJobSkillDto: CreateJobSkillDto,
  ) {
    const jobSkill =
      this.jobSkillRepository.create(
        createJobSkillDto,
      );

    return this.jobSkillRepository.save(
      jobSkill,
    );
  }

  async findAll() {
    return this.jobSkillRepository.find();
  }

  async findOne(id: number) {
    const jobSkill =
      await this.jobSkillRepository.findOne({
        where: { id },
      });

    if (!jobSkill) {
      throw new NotFoundException(
        'Relación chambita-habilidad no encontrada',
      );
    }

    return jobSkill;
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.jobSkillRepository.delete(id);

    return {
      message:
        'Habilidad eliminada de la chambita correctamente',
    };
  }
}