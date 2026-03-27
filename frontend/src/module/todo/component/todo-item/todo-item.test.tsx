import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import TodoItem from './todo-item.tsx'
import type { Todo } from '../../model/todo.ts'

const mockToggle = vi.fn()
const mockEdit = vi.fn()
const mockRemove = vi.fn()

vi.mock('../../store/todo.store.ts', () => ({
  useTodoStore: () => ({
    toggle: mockToggle,
    edit: mockEdit,
    remove: mockRemove
  })
}))

const todo: Todo = { id: '1', text: 'Buy milk', complete: false }

const renderItem = (overrides: Partial<Todo> = {}) =>
  render(
    <MemoryRouter>
      <TodoItem todo={{ ...todo, ...overrides }} />
    </MemoryRouter>
  )

beforeEach(() => vi.clearAllMocks())

describe('TodoItem', () => {
  it('renders the todo text', () => {
    renderItem()
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('renders an unchecked checkbox when todo is not complete', () => {
    renderItem()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders a checked checkbox when todo is complete', () => {
    renderItem({ complete: true })
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls toggle with the todo id when checkbox is clicked', async () => {
    renderItem()
    await userEvent.click(screen.getByRole('checkbox'))
    expect(mockToggle).toHaveBeenCalledWith('1')
  })

  it('calls remove with the todo id when remove button is clicked', async () => {
    renderItem()
    await userEvent.click(screen.getByTitle('Remove'))
    expect(mockRemove).toHaveBeenCalledWith('1')
  })

  it('enters edit mode when edit button is clicked', async () => {
    renderItem()
    await userEvent.click(screen.getByTitle('Edit'))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('calls edit with updated text when Enter is pressed', async () => {
    renderItem()
    await userEvent.click(screen.getByTitle('Edit'))
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Buy oat milk{Enter}')
    expect(mockEdit).toHaveBeenCalledWith('1', 'Buy oat milk')
  })

  it('cancels edit and reverts text on Escape', async () => {
    renderItem()
    await userEvent.click(screen.getByTitle('Edit'))
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Something else{Escape}')
    expect(mockEdit).not.toHaveBeenCalled()
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })
})
