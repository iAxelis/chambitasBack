import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from 'src/users/dto/login.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersService.findByEmail(
      data.email,
    );

    if (!user) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    const match = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!match) {
      throw new UnauthorizedException(
        'Credenciales inválidas',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}