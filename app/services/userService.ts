import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../models/user';
import { UserRepository } from '../repositories/userRepository';

@Service()
export class UserService {
  @OrmRepository(User)
  private userRepository: UserRepository;

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getByName(name: string) : Promise<any> {
    const user = await this.userRepository.getByName(name);
    return user;
  }
}
