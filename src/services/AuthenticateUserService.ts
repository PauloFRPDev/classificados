import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';

import UsersRepository from '../repositories/UsersRepository';

interface RequestData {
  email: string;
  password: string;
}

interface ResponseData {
  user: {
    id: string;
    name: string;
    email: string;
    password?: string;
  };
  token: string;
}

export default class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: RequestData): Promise<ResponseData> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret as string, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
