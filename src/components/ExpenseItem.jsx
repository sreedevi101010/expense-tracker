// Receives one expense and its delete callback; it owns no application state.
function ExpenseItem({ expense, onDeleteExpense }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <div className="expense-details">
        <span className="expense-title">{expense.title}</span>
        <span className="expense-category">{expense.category}</span>
      </div>
      <strong className="expense-amount">
        ${Number(expense.amount).toFixed(2)}
      </strong>
      <button
        type="button"
        className="delete-button"
        data-cy="delete-expense"
        aria-label={`Delete ${expense.title}`}
        onClick={() => onDeleteExpense(expense.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default ExpenseItem
