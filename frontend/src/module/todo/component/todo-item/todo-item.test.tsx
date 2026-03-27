import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TodoItem from './todo-item.tsx'
import type { Todo } from '../../model/todo.ts'

const todo: Todo = { id: '1', text: 'Buy milk', complete: false }

const defaultProps = {
  todo,
  onToggle: vi.fn(),
  onEdit: vi.fn(),
  onDelete: vi.fn()
}

beforeEach(() => vi.clearAllMocks())

describe('TodoItem', () => {
  it('renders the todo text', () => {
    render(<TodoItem {...defaultProps} />)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('renders an unchecked checkbox when todo is not complete', () => {
    render(<TodoItem {...defaultProps} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders a checked checkbox when todo is complete', () => {
    render(<TodoItem {...defaultProps} todo={{ ...todo, complete: true }} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle with the todo id when checkbox is clicked', async () => {
    render(<TodoItem {...defaultProps} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(defaultProps.onToggle).toHaveBeenCalledWith('1')
  })

  it('calls onDelete with the todo id when delete button is clicked', async () => {
    render(<TodoItem {...defaultProps} />)
    await userEvent.click(screen.getByTitle('Remove'))
    expect(defaultProps.onDelete).toHaveBeenCalledWith('1')
  })

  it('enters edit mode on double click', async () => {
    render(<TodoItem {...defaultProps} />)
    await userEvent.dblClick(screen.getByText('Buy milk'))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('calls onEdit with updated text when Enter is pressed', async () => {
    render(<TodoItem {...defaultProps} />)
    await userEvent.dblClick(screen.getByText('Buy milk'))
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Buy oat milk{Enter}')
    expect(defaultProps.onEdit).toHaveBeenCalledWith('1', 'Buy oat milk')
  })

  it('cancels edit and reverts text on Escape', async () => {
    render(<TodoItem {...defaultProps} />)
    await userEvent.dblClick(screen.getByText('Buy milk'))
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, 'Something else{Escape}')
    expect(defaultProps.onEdit).not.toHaveBeenCalled()
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })
})
