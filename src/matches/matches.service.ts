import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async create(
    createMatchDto: CreateMatchDto,
  ) {
    const existingMatch =
      await this.matchRepository.findOne({
        where: {
          jobId: createMatchDto.jobId,
          userId: createMatchDto.userId,
        },
      });

    if (existingMatch) {
      throw new ConflictException(
        'El match ya existe',
      );
    }

    const match =
      this.matchRepository.create(
        createMatchDto,
      );

    return this.matchRepository.save(match);
  }

  async findAll() {
    return this.matchRepository.find();
  }

  async findOne(id: number) {
    const match =
      await this.matchRepository.findOne({
        where: { id },
      });

    if (!match) {
      throw new NotFoundException(
        'Match no encontrado',
      );
    }

    return match;
  }

  async update(
    id: number,
    updateMatchDto: UpdateMatchDto,
  ) {
    await this.findOne(id);

    await this.matchRepository.update(
      id,
      updateMatchDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.matchRepository.delete(id);

    return {
      message: 'Match eliminado correctamente',
    };
  }
}