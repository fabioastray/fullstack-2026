import { Module } from '@nestjs/common'
import { TodosController } from './controller/todos.controller'
import { TodosService } from './services/todos.service'

@Module({
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
