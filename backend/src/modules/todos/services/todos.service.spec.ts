import { Test, TestingModule } from '@nestjs/testing'
import { TodosService } from './todos.service'
import { mockDeep } from 'jest-mock-extended'
import { PrismaService } from '../../../prisma/prisma.service'

describe('TodosService', () => {
  let service: TodosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, PrismaService]
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile()

    service = module.get<TodosService>(TodosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
