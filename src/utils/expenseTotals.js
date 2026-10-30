export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + Number(expense.amount), 0)
}
