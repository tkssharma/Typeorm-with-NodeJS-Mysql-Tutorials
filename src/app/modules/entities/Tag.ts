import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tag!: string;

}