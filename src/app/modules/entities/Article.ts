import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
export class Article {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  slug!: string;

  @Column()
  title!: string;

  @Column({default: ''})
  description!: string;

  @Column({default: ''})
  body!: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  created!: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  updated!: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date;
  }

  @Column('simple-array')
  tagList!: string[];

  @ManyToOne(type => User, user => user.articles)
  author!: User;

  @OneToMany(type => Comment, comment => comment.article)
  @JoinColumn()
  comments!: Comment[];

  @Column({default: 0})
  favoriteCount!: number;
}