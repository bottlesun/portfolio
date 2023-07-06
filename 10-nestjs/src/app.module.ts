import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './boards/board.repository';
import { BoardsModule } from './boards/boards.module';
import { typeormConfig } from './config/typeorm.confog';
import { TypeOrmExModule } from './database/typeorm-ex.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
