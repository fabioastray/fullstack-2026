import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Version
} from '@nestjs/common'
import { TodosService } from '../services/todos.service'
import { type UpsertTodo } from '../dto/upsert-todo.dto'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Version('1')
  @Get()
  findAll() {
    return this.todosService.findAll()
  }

  @Version('1')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.findOne(id)
  }

  @Version('1')
  @Post()
  create(@Body() createTodo: UpsertTodo) {
    return this.todosService.create(createTodo)
  }

  @Version('1')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodo: UpsertTodo
  ) {
    return this.todosService.update(id, updateTodo)
  }

  @Version('1')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id)
  }
}
