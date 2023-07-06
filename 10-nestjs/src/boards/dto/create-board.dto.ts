import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty() // title이 비어있으면 안된다는 뜻
  title: string;

  @IsNotEmpty() // description이 비어있으면 안된다는 뜻
  description: string;
}
