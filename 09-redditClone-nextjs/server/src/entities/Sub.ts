import {Expose} from "class-transformer";
import {Column, Entity, Index, ManyToOne, OneToMany} from "typeorm";
import {JoinColumn} from "typeorm/browser";
import BaseEntity from "./Entity";
import {User, Post} from "../entities";

@Entity("subs")
export class Sub extends BaseEntity {
  @Index()
  @Column()
  name: string; // post JoinColumn ref 값

  @Column({type: "text", nullable: true})
  description: string;

  @Column({nullable: true})
  imageUrn: string;

  @Column({nullable: true})
  bannerUrn: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  //JoinColumn 은 외래키를 설정한다.
  // name 은 외래키를 설정하는 컬럼을 설정한다.
  // name 의 디폴트 값은 외래키를 참조하는 컬럼의 이름 + Id 이다.
  // referencedColumnName 는 외래키를 참조하는 컬럼을 설정한다.
  // referencedColumnName 의 디폴트 값은 id 이다.
  @JoinColumn({name: "username", referencedColumnName: "username"})
  user: User;

  @OneToMany(() => Post, post => post.sub)
  post: Post[];

  // Expose 는 class-transformer 를 사용하여 class 를 json 으로 변환할 때 사용한다.
  @Expose()
  get imageUrl(): string {
    //process.env.APP_URL = http://localhost:4000
    return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` :
      "https://www.gravatar.com/avatar?d=mp&f=y";
  }

  @Expose()
  get bannerUrl(): string | undefined {
    return this.bannerUrn ? `${process.env.APP_URL}/images/${this.bannerUrn}` : undefined;
  }

}