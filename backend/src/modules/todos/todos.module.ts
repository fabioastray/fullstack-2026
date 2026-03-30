import { Module } from '@nestjs/common'
import { TodosController } from './controller/todos.controller'
import { TodosService } from './services/todos.service'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
