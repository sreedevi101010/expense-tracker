import ExpenseItem from './ExpenseItem'

// Receives the visible expenses and deletion callback; it owns no application state.
function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <ul className="expense-list" aria-label="Expenses">
      {expenses.length === 0 ? (
        <li className="empty-state" role="status">
          No expenses to display. Add an expense or choose another category.
        </li>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDeleteExpense={onDeleteExpense}
          />
        ))
      )}
    </ul>
  )
}

export default ExpenseList
