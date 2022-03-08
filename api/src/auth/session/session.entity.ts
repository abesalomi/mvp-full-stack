import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Session {


  @Column()
  @PrimaryColumn()
  sessionId: string;

  @Column()
  userId: number;

  @Column()
  isInvalid: boolean;

  @Column()
  expiresAt: Date;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt?: Date;

  @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt?: Date;

}
