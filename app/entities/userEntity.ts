import { BaseEntity } from './baseEntity';
import { User } from '../models/user';

export class UserEntity extends BaseEntity {
  private id: number;
  private name: string;
  private token: string;
  private createdAt: Date;

  public constructor(user: User) {
    super();
    console.log(`userMapper:${JSON.stringify(user)}`);
    this.id = user.id;
    this.name = user.name;
    this.token = user.token;
    this.createdAt = user.createdAt;
  }
}
