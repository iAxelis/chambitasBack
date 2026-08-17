import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
  ) {
    const existingReview =
      await this.reviewRepository.findOne({
        where: {
          contractId: createReviewDto.contractId,
          reviewerId: createReviewDto.reviewerId,
        },
      });

    if (existingReview) {
      throw new ConflictException(
        'El usuario ya calificó este contrato',
      );
    }

    const review =
      this.reviewRepository.create(
        createReviewDto,
      );

    return this.reviewRepository.save(review);
  }

  async findAll() {
    return this.reviewRepository.find();
  }

  async findOne(id: number) {
    const review =
      await this.reviewRepository.findOne({
        where: { id },
      });

    if (!review) {
      throw new NotFoundException(
        'Calificación no encontrada',
      );
    }

    return review;
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ) {
    await this.findOne(id);

    await this.reviewRepository.update(
      id,
      updateReviewDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.reviewRepository.delete(id);

    return {
      message:
        'Calificación eliminada correctamente',
    };
  }
}