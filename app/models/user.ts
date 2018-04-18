import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 这个是必要的吗？
  @Column({ default: 'null@null.com' })
  email: string;

  // 手机号是必要的吗？
  @Column({ default: '' })
  phone: string;

  @Column()
  password: string;

  @Column({ default: '' })
  salt: string;

  @Column({ name: 'state', default: 0 })
  state: number;

  @Column()
  token: string;

  @Column({ default: 'default' })
  scope: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
