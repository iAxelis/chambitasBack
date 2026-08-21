import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { UserSkillsService } from './user-skills.service';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';

@Controller('user-skills')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  @Post()
  create(
    @Body()
    createUserSkillDto: CreateUserSkillDto,
  ) {
    return this.userSkillsService.create(createUserSkillDto);
  }

  @Get()
  findAll() {
    return this.userSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userSkillsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userSkillsService.remove(id);
  }
}
