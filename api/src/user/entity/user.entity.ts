import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

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
  password: string;

  @Column({
    type: 'enum',
    array: true,
    enum: Role
  })
  roles: Set<Role>;

}
