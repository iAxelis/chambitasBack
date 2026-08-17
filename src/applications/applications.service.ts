import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ) {
    const existingApplication =
      await this.applicationRepository.findOne({
        where: {
          jobId: createApplicationDto.jobId,
          userId: createApplicationDto.userId,
        },
      });

    if (existingApplication) {
      throw new ConflictException(
        'El usuario ya se postuló a esta chambita',
      );
    }

    const application =
      this.applicationRepository.create(
        createApplicationDto,
      );

    return this.applicationRepository.save(
      application,
    );
  }

  async findAll() {
    return this.applicationRepository.find();
  }

  async findOne(id: number) {
    const application =
      await this.applicationRepository.findOne({
        where: { id },
      });

    if (!application) {
      throw new NotFoundException(
        'Postulación no encontrada',
      );
    }

    return application;
  }

  async update(
    id: number,
    updateApplicationDto: UpdateApplicationDto,
  ) {
    await this.findOne(id);

    await this.applicationRepository.update(
      id,
      updateApplicationDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.applicationRepository.delete(id);

    return {
      message:
        'Postulación eliminada correctamente',
    };
  }
}