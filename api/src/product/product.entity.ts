import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique: true})
  @Column()
  productName: string;

  @Column({default: 0})
  amountAvailable: number;

  @Column({type: 'float'})
  cost: number;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date

  @ManyToOne(type => User, user => user.products)
  user: User;

}
