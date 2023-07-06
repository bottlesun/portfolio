import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './boards-statues.enum';

@Entity() // 엔티티를 선언하는 데코레이터
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본키
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
