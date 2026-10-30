import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App'

function addExpense({ title, amount, category }) {
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

test('starts with an empty state, zero visible expenses, and a zero total', () => {
  render(<App />)

  expect(screen.getByRole('status')).toHaveTextContent(/no expenses/i)
  expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('0')
  expect(document.querySelector('[data-cy="total"]')).toHaveTextContent(
    '$0.00',
  )
})

test('offers all supported categories in the expense filter', () => {
  render(<App />)

  expect(
    Array.from(
      screen.getByLabelText('Filter by category').options,
      (option) => option.text,
    ),
  ).toEqual(['All', 'Food', 'Travel', 'Bills', 'Other'])
})

test('adds an expense and updates its row, count, and formatted total', () => {
  render(<App />)

  addExpense({ title: 'Coffee', amount: '4.5', category: 'Food' })

  const row = screen.getByText('Coffee').closest('[data-cy="expense-item"]')
  expect(row).toHaveTextContent('$4.50')
  expect(row).toHaveTextContent('Food')
  expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('1')
  expect(document.querySelector('[data-cy="total"]')).toHaveTextContent(
    '$4.50',
  )
})

test('filters visible expenses while total continues to include every expense', () => {
  render(<App />)
  addExpense({ title: 'Groceries', amount: '12.5', category: 'Food' })
  addExpense({ title: 'Bus fare', amount: '7.3', category: 'Travel' })

  fireEvent.change(screen.getByLabelText('Filter by category'), {
    target: { value: 'Travel' },
  })

  expect(screen.getByText('Bus fare')).toBeInTheDocument()
  expect(screen.queryByText('Groceries')).not.toBeInTheDocument()
  expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('1')
  expect(document.querySelector('[data-cy="total"]')).toHaveTextContent(
    '$19.80',
  )

  fireEvent.change(screen.getByLabelText('Filter by category'), {
    target: { value: 'All' },
  })

  expect(screen.getByText('Groceries')).toBeInTheDocument()
  expect(screen.getByText('Bus fare')).toBeInTheDocument()
  expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('2')
})

test('deleting one expense retains the other and updates count and total', () => {
  render(<App />)
  addExpense({ title: 'Groceries', amount: '12.5', category: 'Food' })
  addExpense({ title: 'Bus fare', amount: '7.3', category: 'Travel' })

  fireEvent.click(screen.getByRole('button', { name: 'Delete Bus fare' }))

  expect(screen.getByText('Groceries')).toBeInTheDocument()
  expect(screen.queryByText('Bus fare')).not.toBeInTheDocument()
  expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('1')
  expect(document.querySelector('[data-cy="total"]')).toHaveTextContent(
    '$12.50',
  )
})

test('shows zero visible expenses when the selected category has no matches', () => {
  render(<App />)
  addExpense({ title: 'Groceries', amount: '12.5', category: 'Food' })

  fireEvent.change(screen.getByLabelText('Filter by category'), {
    target: { value: 'Bills' },
  })

  expect(document.querySelector('[data-cy="count"]')).toHaveTextContent('0')
  expect(document.querySelector('[data-cy="total"]')).toHaveTextContent(
    '$12.50',
  )
  expect(screen.getByRole('status')).toHaveTextContent(/no expenses/i)
})

test('renders an accessible delete control for each visible expense', () => {
  render(<App />)
  addExpense({ title: 'Coffee', amount: '4.5', category: 'Food' })
  addExpense({ title: 'Bus fare', amount: '7.3', category: 'Travel' })

  const list = screen.getByRole('list', { name: 'Expenses' })
  expect(within(list).getAllByRole('button', { name: /^Delete / })).toHaveLength(
    2,
  )
  expect(list.querySelectorAll('[data-cy="expense-item"]')).toHaveLength(2)
})
