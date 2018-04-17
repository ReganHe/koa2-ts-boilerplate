import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm/repository/Repository';
import { Client } from '../models/client';

@Service()
export class AppService {
  @OrmRepository(Client)
  private appRepository: Repository<Client>;

  async getApplicationInfo(packageName: string) : Promise<Client> {
    return this.appRepository.findOne({
      where:'name LIKE "%' + packageName + '%"',
    });
  }
}
