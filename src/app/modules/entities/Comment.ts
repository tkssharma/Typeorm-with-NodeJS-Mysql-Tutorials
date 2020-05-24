import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Post from './Post';
import User from './User';
import { Article } from './Article';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsNotEmpty()
  public text!: string;

  @ManyToOne(() => User, user => user.comments, { eager: true, onDelete: 'CASCADE' })
  public user: User = new User;

  @ManyToOne(() => Post, post => post.comments, { eager: true, onDelete: 'CASCADE' })
  public post: Post = new Post;

  @ManyToOne(() => Article, post => post.comments, { onDelete: 'CASCADE' })
  public article: Article = new Article;

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default Comment;
