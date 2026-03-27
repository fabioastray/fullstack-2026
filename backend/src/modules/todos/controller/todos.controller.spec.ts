import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { TodosController } from './todos.controller'
import { TodosService } from '../services/todos.service'
import { Todo } from '../dto/todo.dto'

const mockTodo: Todo = { id: '1', text: 'Learn NestJS', complete: false }

const mockTodosService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn()
}

describe('TodosController', () => {
  let controller: TodosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: mockTodosService }]
    }).compile()

    controller = module.get<TodosController>(TodosController)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('findAll', () => {
    it('returns all todos', () => {
      mockTodosService.findAll.mockReturnValue([mockTodo])
      expect(controller.findAll()).toEqual([mockTodo])
    })
  })

  describe('findOne', () => {
    it('returns a todo by id', () => {
      mockTodosService.findOne.mockReturnValue(mockTodo)
      expect(controller.findOne('1')).toEqual(mockTodo)
      expect(mockTodosService.findOne).toHaveBeenCalledWith('1')
    })

    it('throws NotFoundException when todo does not exist', () => {
      mockTodosService.findOne.mockImplementation(() => {
        throw new NotFoundException()
      })
      expect(() => controller.findOne('999')).toThrow(NotFoundException)
    })
  })

  describe('create', () => {
    it('creates and returns a new todo', () => {
      mockTodosService.create.mockReturnValue(mockTodo)
      expect(
        controller.create({ text: 'Learn NestJS', complete: false })
      ).toEqual(mockTodo)
    })
  })

  describe('update', () => {
    it('updates and returns the todo', () => {
      const updated: Todo = { ...mockTodo, text: 'Learn NestJS deeply' }
      mockTodosService.update.mockReturnValue(updated)
      const payload = { text: 'Learn NestJS deeply', complete: false }
      expect(controller.update('1', payload)).toEqual(updated)
      expect(mockTodosService.update).toHaveBeenCalledWith('1', payload)
    })
  })

  describe('remove', () => {
    it('removes a todo', () => {
      mockTodosService.remove.mockReturnValue(undefined)
      expect(() => controller.remove('1')).not.toThrow()
      expect(mockTodosService.remove).toHaveBeenCalledWith('1')
    })

    it('throws NotFoundException when todo does not exist', () => {
      mockTodosService.remove.mockImplementation(() => {
        throw new NotFoundException()
      })
      expect(() => controller.remove('999')).toThrow(NotFoundException)
    })
  })
})
