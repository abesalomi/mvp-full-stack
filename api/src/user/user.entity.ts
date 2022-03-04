import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role';
import { Product } from '../product/product.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique: true})
  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude({toPlainOnly: true})
  password: string;

  @Column('float', {default: 0})
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
  roles: Set<Role>;

  @OneToMany(type => Product, product => product.user)
  products: Product[]

}
