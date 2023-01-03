import {makeId, slugify} from "../utility/helpers";
import BaseEntity from "./Entity";
import {BeforeInsert, Column, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {User, Sub, Vote, Comment} from "../entities";
import {Exclude, Expose} from "class-transformer"

export class Post extends BaseEntity {
  @Index()
  @Column()
  identifier: string; // 7 character id

  @Column()
  title: string;

  //@Index() // index 를 설정하면, 해당 컬럼을 기준으로 검색이 가능하다.
  @Index()
  @Column()
  slug: string

  @Column({type: "text", nullable: true})
    // nullable 을 true 로 설정하면, 해당 컬럼은 null 이 될 수 있다.
  body: string

  @Column()
  subName: string; // 여기로 대입 JoinColumn

  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({name: 'username', referencedColumnName: 'username'})
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.post)
  @JoinColumn({name: 'subName', referencedColumnName: 'name'})
  sub: Sub;

  // Exclude 와 Expose 의 차이는 Exclude 는 json 으로 변환할 때 제외하고,
  // Expose 는 json 으로 변환할 때 포함한다.

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude()
  //Exclude() 는 class-transformer를 사용하여 class를 json으로 변환할 때 사용한다.
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @Expose()
  //Expose 는 class-transformer를 사용하여 class를 json으로 변환할 때 사용한다.
  get url(): string {
    // url 은 post 의 url 을 구한다.
    return `r/${this.subName}/${this.identifier}/${this.slug}`
  }

  @Expose()
  get commentCount(): number {
    // commentCount 는 comment 의 개수를 구한다.
    return this.comments?.length
  }

  @Expose()
  get voteScore(): number {
    //voteScore 는 vote 의 합을 구한다.
    return this.votes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
  }

  protected userVote: number;

  //protected 는 상속받은 클래스에서만 사용할 수 있다.

  setUserVote(user: User) {
    //setUserVote 는 user 가 vote 한 값을 저장한다.
    const index = this.votes?.findIndex(v => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    // makeIdAndSlug 는 identifier 와 slug 를 생성한다.
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }

}