import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async create(
    createContractDto: CreateContractDto,
  ) {
    const existingContract =
      await this.contractRepository.findOne({
        where: {
          matchId: createContractDto.matchId,
        },
      });

    if (existingContract) {
      throw new ConflictException(
        'El contrato ya existe para este match',
      );
    }

    const contract =
      this.contractRepository.create(
        createContractDto,
      );

    return this.contractRepository.save(
      contract,
    );
  }

  async findAll() {
    return this.contractRepository.find();
  }

  async findOne(id: number) {
    const contract =
      await this.contractRepository.findOne({
        where: { id },
      });

    if (!contract) {
      throw new NotFoundException(
        'Contrato no encontrado',
      );
    }

    return contract;
  }

  async update(
    id: number,
    updateContractDto: UpdateContractDto,
  ) {
    await this.findOne(id);

    await this.contractRepository.update(
      id,
      updateContractDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.contractRepository.delete(id);

    return {
      message: 'Contrato eliminado correctamente',
    };
  }
}