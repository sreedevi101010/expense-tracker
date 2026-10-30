import { useState } from 'react'
import CategoryFilter from './components/CategoryFilter'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import { calculateTotal } from './utils/expenseTotals'
import './App.css'

// Owns the expense collection and selected filter; children receive data and actions through props.
function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const visibleExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory)

  function addExpense(expense) {
    const id =
      globalThis.crypto?.randomUUID?.() ??
      `expense-${Date.now()}-${Math.random()}`
    setExpenses((currentExpenses) => [...currentExpenses, { ...expense, id }])
  }

  function deleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    )
  }

  return (
    <main className="expense-app">
      <header className="page-header">
        <p className="eyebrow">Personal finance</p>
        <h1>Expense Tracker</h1>
        <p className="page-description">
          Keep track of your spending, one expense at a time.
        </p>
      </header>

      <section className="summary" aria-label="Expense summary">
        <div className="summary-card">
          <span className="summary-label">Total expenses</span>
          <strong data-cy="total">${calculateTotal(expenses).toFixed(2)}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Visible expenses</span>
          <strong data-cy="count">{visibleExpenses.length}</strong>
        </div>
      </section>

      <section className="entry-section" aria-labelledby="add-expense-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">New entry</p>
            <h2 id="add-expense-heading">Add an expense</h2>
          </div>
        </div>
        <ExpenseForm onAddExpense={addExpense} />
      </section>

      <section className="expenses-section" aria-labelledby="expenses-heading">
        <div className="section-heading expenses-heading">
          <div>
            <p className="eyebrow">Your activity</p>
            <h2 id="expenses-heading">Expenses</h2>
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <ExpenseList
          expenses={visibleExpenses}
          onDeleteExpense={deleteExpense}
        />
      </section>
    </main>
  )
}

export default App
