import { Inject, Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserUpdateDao } from './dao/user-update.dao';

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

    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(user.password, salt);

    return this.userRepository.save({
      ...user,
      password
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
      id
    })
  }

  async deposit(amount: number, id: number) {
    await getManager().transaction(async manager => {
      const user = await manager.findOne(User, id);
      user.deposit += amount;
      await manager.save(user);
    });
    return this.userRepository.findOne(id);
  }

  async update(id: number, updateDao: UserUpdateDao) {
    const user = await this.userRepository.findOne(id);
    user.firstName = updateDao.firstName || user.firstName;
    user.lastName = updateDao.lastName || user.lastName;
    return await this.userRepository.save(user);

  }
}
