import { Inject, Service } from 'typedi';
import { JsonController, Param, Get, NotAcceptableError, Authorized, CurrentUser } from 'routing-controllers';
import { DataResult } from '../../lib/response/dataResult';
import { UserService } from '../services/userService';
import { User } from '../models/user';
import { UserEntity } from '../entities/userEntity';

@JsonController('/api/v1/users')
@Service()
export class UserApi {

  @Inject()
  private userService: UserService;

  @Get('/')
  async getAllUsers2(): Promise<DataResult<UserEntity[]>> {
    // 校验当前用户。
    // 获取 token
    // 校验 token
    const users = await this.userService.getAll();
    const userEntities = users.map((r) => {
      return new UserEntity(r);
    });
    return DataResult.ok<UserEntity[]>(userEntities);
  }

  @Authorized('admin')
  @Get('/:name')
  async getUser(@CurrentUser({ required: true }) user: User, @Param('name') name: string): Promise<DataResult<UserEntity>> {
    const user2 = await this.userService.getByName(name);
    // throw new NotAcceptableError("Custom Error");

    if (user2) {
      const userEntity = new UserEntity(user2);
      return DataResult.ok<UserEntity>(userEntity);
    }

    throw new NotAcceptableError('Custom Error');
  }
}
