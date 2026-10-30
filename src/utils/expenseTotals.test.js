import { expect, test } from 'vitest'
import { calculateTotal } from './expenseTotals'

test('calculates the sum of all expense amounts', () => {
  expect(
    calculateTotal([
      { amount: 12.5 },
      { amount: 7.3 },
      { amount: 0.2 },
    ]),
  ).toBeCloseTo(20)
})

test('returns zero for an empty expense list', () => {
  expect(calculateTotal([])).toBe(0)
})

test('does not mutate the expense list while calculating its total', () => {
  const expenses = [{ amount: 10 }, { amount: 3.25 }]
  const originalExpenses = [...expenses]

  calculateTotal(expenses)

  expect(expenses).toEqual(originalExpenses)
})
