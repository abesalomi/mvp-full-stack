import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserUpdateDao } from './dao/user-update.dao';

const salt = bcrypt.genSaltSync(10);

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {

    const password = await bcrypt.hash(user.password, salt);

    return this.userRepository.save({
      ...user,
      password,
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      username,
    });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async delete(id: number) {
    return this.userRepository.delete({
      id,
    })
  }

  async update(id: number, updateDao: UserUpdateDao) {
    const user = await this.userRepository.findOne(id);

    if (updateDao.username) {
      user.username = updateDao.username;
    }

    if (updateDao.password) {
      user.password = await bcrypt.hash(updateDao.password, salt);
    }

    return await this.userRepository.save(user);

  }
}
