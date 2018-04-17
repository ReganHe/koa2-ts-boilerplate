import { Inject, Service } from 'typedi';
import { JsonController, Param, Body, Get, Post, Put, Delete, NotAcceptableError, UseInterceptor, Authorized, CurrentUser } from 'routing-controllers';
import { DataResult } from '../../lib/response/dataResult';
import { Context } from 'koa';
import { UserService } from '../services/userService';
import { User } from '../models/user';
import { Fact } from '../models/fact';
import { UserEntity } from '../entities/userEntity';


@JsonController('/api/v1/users')
@Service()
export class UserApi {

  @Inject()
  private userService: UserService;

  @Get('/')
  async getAllUsers(): Promise<DataResult<User[]>> {
    // 校验当前用户。
    // 1取 token
    // 校验 token

    const users = await this.userService.getAll();

    return DataResult.ok<User[]>(users);
  }

  // @Get('/:name')
  // async getConfig(@Param('name') name: string): Promise<DataResult<UserEntity>> {
  //   const user = await this.userService.getByName(name);

  //   const userEntity = new UserEntity(user)

  //   return DataResult.ok<UserEntity>(userEntity);
  // }


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
