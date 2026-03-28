import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import TodoItem from './todo-item.tsx'
import type { Todo } from '../../model/todo.ts'

const mockUpdate = vi.fn()
const mockRemove = vi.fn()

vi.mock('../../hooks/useTodos.ts', () => ({
  useTodos: () => ({
    update: mockUpdate,
    remove: mockRemove,
    mutatingId: null
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

  it('calls update with toggled complete when checkbox is clicked', async () => {
    renderItem()
    await userEvent.click(screen.getByRole('checkbox'))
    expect(mockUpdate).toHaveBeenCalledWith({
      id: '1',
      todo: { text: 'Buy milk', complete: true }
    })
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

  it('calls update with updated text when Enter is pressed', async () => {
    renderItem()
    await userEvent.click(screen.getByTitle('Edit'))
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Buy oat milk{Enter}')
    expect(mockUpdate).toHaveBeenCalledWith({
      id: '1',
      todo: { text: 'Buy oat milk', complete: false }
    })
  })

  it('cancels edit and reverts text on Escape', async () => {
    renderItem()
    await userEvent.click(screen.getByTitle('Edit'))
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Something else{Escape}')
    expect(mockUpdate).not.toHaveBeenCalled()
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })
})
