import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role';
import { Product } from '../product/product.entity';
import { Exclude } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, MinLength } from 'class-validator';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique: true})
  @Column()
  @MinLength(4)
  username: string;

  @Column()
  @Exclude({toPlainOnly: true})
  @MinLength(8)
  password: string;

  @Column('integer', {default: 0})
  deposit: number;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

  @Column({
    type: 'enum',
    array: true,
    enum: Role,
  })
  @ArrayMaxSize(1, {message: 'You should select 1 role.'})
  @ArrayMinSize(1, {message: 'You should select 1 role.'})
  roles: Set<Role>;

  @OneToMany(type => Product, product => product.user)
  products: Product[]

}
