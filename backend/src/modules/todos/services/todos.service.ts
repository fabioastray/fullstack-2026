import { Injectable, NotFoundException } from '@nestjs/common'
import { Todo } from '../dto/todo.dto'
import { UpsertTodo } from '../dto/upsert-todo.dto'
import { PrismaService } from '../../../prisma/prisma.service'
import { ResultsResponse } from '../../../common/dto/results-response.dto'

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  notFoundException(id: number): never {
    throw new NotFoundException(`Todo ${id} not found`)
  }

  async findAll(
    page?: number,
    pageSize?: number
  ): Promise<ResultsResponse<Todo>> {
    const db = this.prisma.todo

    if (!page || !pageSize) {
      const items = await db.findMany({
        orderBy: { id: 'desc' }
      })
      return {
        items,
        total: items.length
      }
    } else {
      const skip = (page - 1) * pageSize
      const total = await db.count({})

      const items = await db.findMany({
        skip,
        take: pageSize,
        orderBy: { id: 'desc' }
      })

      return {
        items,
        total
      }
    }
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: { id }
    })

    if (!todo) this.notFoundException(id)

    return todo
  }

  async create(create: UpsertTodo): Promise<Todo> {
    return this.prisma.todo.create({
      data: { text: create.text, complete: create.complete }
    })
  }

  async update(id: number, update: Partial<UpsertTodo>): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: { text: update.text, complete: update.complete }
    })
  }

  async remove(id: number): Promise<Todo> {
    try {
      return await this.prisma.todo.delete({ where: { id } })
    } catch (e: unknown) {
      if (this.prisma.wasErrorDeleting(e)) this.notFoundException(id)
      throw e
    }
  }
}
