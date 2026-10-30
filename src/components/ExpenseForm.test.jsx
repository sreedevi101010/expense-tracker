import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import ExpenseForm from './ExpenseForm'

test('rejects an amount greater than 100000', () => {
  const onAddExpense = vi.fn()
  render(<ExpenseForm onAddExpense={onAddExpense} />)

  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: 'Rent' },
  })
  fireEvent.change(screen.getByLabelText('Amount'), {
    target: { value: '100001' },
  })
  fireEvent.change(screen.getByLabelText('Category'), {
    target: { value: 'Bills' },
  })
  fireEvent.submit(screen.getByRole('form', { name: 'Add expense' }))

  expect(onAddExpense).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Amount must be 100000 or less.',
  )
})

function submitExpense({
  title = 'Coffee',
  amount = '4.5',
  category = 'Food',
} = {}) {
  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: title },
  })
  fireEvent.change(screen.getByLabelText('Amount'), {
    target: { value: amount },
  })
  fireEvent.change(screen.getByLabelText('Category'), {
    target: { value: category },
  })
  fireEvent.submit(screen.getByRole('form', { name: 'Add expense' }))
}

test('renders labeled title, amount, and category controls', () => {
  render(<ExpenseForm onAddExpense={vi.fn()} />)

  expect(screen.getByLabelText('Title')).toBeInTheDocument()
  expect(screen.getByLabelText('Amount')).toBeInTheDocument()
  expect(screen.getByLabelText('Category')).toBeInTheDocument()
})

test('offers the required categories', () => {
  render(<ExpenseForm onAddExpense={vi.fn()} />)

  expect(
    Array.from(
      screen.getByLabelText('Category').options,
      (option) => option.text,
    ),
  ).toEqual(['Food', 'Travel', 'Bills', 'Other'])
})

test('submits valid expense data once with a numeric amount', () => {
  const onAddExpense = vi.fn()
  render(<ExpenseForm onAddExpense={onAddExpense} />)

  submitExpense({ title: '  Groceries  ', amount: '42.50', category: 'Food' })

  expect(onAddExpense).toHaveBeenCalledOnce()
  expect(onAddExpense).toHaveBeenCalledWith({
    title: 'Groceries',
    amount: 42.5,
    category: 'Food',
  })
})

test.each(['', '   '])('rejects title %j with accessible feedback', (title) => {
  const onAddExpense = vi.fn()
  render(<ExpenseForm onAddExpense={onAddExpense} />)

  submitExpense({ title })

  expect(onAddExpense).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toHaveTextContent('Title is required.')
  expect(screen.getByLabelText('Title')).toHaveAttribute('aria-invalid', 'true')
})

test.each([
  ['not-a-number', 'Enter a valid amount.'],
  ['0', 'Amount must be greater than 0.'],
  ['-5', 'Amount must be greater than 0.'],
])('rejects amount %s with accessible feedback', (amount, message) => {
  const onAddExpense = vi.fn()
  render(<ExpenseForm onAddExpense={onAddExpense} />)

  submitExpense({ amount })

  expect(onAddExpense).not.toHaveBeenCalled()
  expect(screen.getByRole('alert')).toHaveTextContent(message)
  expect(screen.getByLabelText('Amount')).toHaveAttribute(
    'aria-invalid',
    'true',
  )
})

test('accepts an amount of exactly 100000', () => {
  const onAddExpense = vi.fn()
  render(<ExpenseForm onAddExpense={onAddExpense} />)

  submitExpense({ amount: '100000' })

  expect(onAddExpense).toHaveBeenCalledOnce()
  expect(onAddExpense).toHaveBeenCalledWith({
    title: 'Coffee',
    amount: 100000,
    category: 'Food',
  })
})
