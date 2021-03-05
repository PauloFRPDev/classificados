import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestData {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: RequestData): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    user.password = await hash(password, 8);

    await usersRepository.save(user);

    return user;
  }
}
