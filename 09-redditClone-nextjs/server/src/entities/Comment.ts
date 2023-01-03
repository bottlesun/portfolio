import {Exclude, Expose} from "class-transformer";
import {BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import BaseEntity from "./Entity"
import {Vote,User, Post} from "../entities";

import {makeId} from "../utility/helpers";

@Entity('comment')
export class Comment extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Column({type: "text", nullable: true})
  body: string

  @Column()
  username: string

  @ManyToOne(() => User)
  @JoinColumn({name: "username", referencedColumnName: "username"})
  user: User

  @Column({nullable: true})
  postId: number

  @ManyToOne(() => Post)
  post: Post

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[]

  protected userVote: number;

  setUserVote(user: User) {
    // votes 에서 user 의 username 과 일치하는 것을 찾는다.
    // userVote 에 찾은 것이 있으면 그 값을, 없으면 0 을 대입한다.
    const index = this.votes?.findIndex((v) => v.username === user.username)
    this.userVote = index > -1 ? this.votes[index].value : 0
  }

  @Expose()
  get voteScore(): number {
    // voteScore 는 vote 의 합을 구한다.
    //  votes 가 null 이면 0 을 반환하고 , null 이 아니면 votes 의 value 를 더한다.
    const initialValue = 0
    return this.votes?.reduce((prev, curr) => prev + (curr.value || 0), initialValue)
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8)
  }


}
