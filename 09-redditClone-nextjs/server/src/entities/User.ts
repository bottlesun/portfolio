import {Length , IsEmail} from "class-validator";
import {Entity, Index, Column, OneToMany, BeforeInsert} from "typeorm"
import BaseEntity from "./Entity";
import bcrypt from "bcryptjs";

@Entity("users")
export class User extends BaseEntity {
  // @Index() // index 를 사용하면 검색 속도가 빨라진다.
  @Index()
  // @IsEmail() // 이메일 형식인지 검사 (class-validator)
  @IsEmail(undefined,{message: "Must be a valid email"})
  // @Length 를 사용하면 비밀번호를 해싱하기 전에 유효성 검사를 해야한다. (class-validator)
  @Length(1,255,{message: "Email must not be empty"})
  @Column({unique: true})
  email : string

  @Index()
  @Length(3,32,{message: "Username must be at least 3 characters long"})
  @Column()
  username: string

  @Column()
  @Length(6,255,{message: "Password must be at least 6 characters long"})
  password: string

  //@OneToMany 는 1:N 관계를 나타낸다. (typeorm)
  @OneToMany(() => Post, post => post.user)
  posts: Post[]; // post.ts

  @OneToMany(() => Vote,(vote) => vote.user)
  votes: Vote[] // Vote.ts

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    // 비밀번호를 해싱
    this.password = await bcrypt.hash(this.password, 6);
  }
}
