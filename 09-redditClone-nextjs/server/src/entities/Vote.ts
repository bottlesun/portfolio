import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import BaseEntity from "./Entity";
import {Post, User, Comment} from "../entities";

@Entity('votes')
export class Vote extends BaseEntity {
  @Column()
  value: number;

  @Column()
  username: string

  @ManyToOne(() => User)
  @JoinColumn({name: "username", referencedColumnName: "username"})
  user: User

  @Column({nullable: true})
  postId: number

  @ManyToOne(() => Post)
  post: Post

  @Column({nullable: true})
  commentId: number

  @ManyToOne(() => Comment)
  comment: Comment

}