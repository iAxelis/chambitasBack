import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const job = this.jobRepository.create(
      createJobDto,
    );

    return this.jobRepository.save(job);
  }

  async findAll() {
    return this.jobRepository.find();
  }

  async findOne(id: number) {
    const job = await this.jobRepository.findOne({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(
        'Chambita no encontrada',
      );
    }

    return job;
  }

  async update(
    id: number,
    updateJobDto: UpdateJobDto,
  ) {
    await this.findOne(id);

    await this.jobRepository.update(
      id,
      updateJobDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.jobRepository.delete(id);

    return {
      message: 'Chambita eliminada correctamente',
    };
  }
}