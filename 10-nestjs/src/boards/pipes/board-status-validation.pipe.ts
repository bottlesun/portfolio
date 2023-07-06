import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards-statues.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase(); // 대문자로 변환

    if (!this.isStatusValid(value)) {
      // status가 유효하지 않으면 에러를 던진다.
      throw new Error(`${value} isn't in the status options`);
    }
    return value;
  }
  private isStatusValid(status: any) {
    /**
     * @name isStatusValid()
     * @description status가 유효한지 검사하는 함수
     * @param status
     * @returns boolean
     * */

    const idx = this.StatusOptions.indexOf(status);
    return idx !== -1;
  }
}
