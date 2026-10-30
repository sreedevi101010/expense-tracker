import { useState } from 'react'

// Receives the App-provided expense callback; local state holds only form values.
function ExpenseForm({ onAddExpense }) {
  const [values, setValues] = useState({
    title: '',
    amount: '',
    category: 'Food',
  })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = values.title.trim()
    const amountText = values.amount.trim()
    const amount = Number(amountText)
    const nextErrors = {}

    if (!title) {
      nextErrors.title = 'Title is required.'
    }

    if (
      !/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(amountText) ||
      !Number.isFinite(amount)
    ) {
      nextErrors.amount = 'Enter a valid amount.'
    } else if (amount <= 0) {
      nextErrors.amount = 'Amount must be greater than 0.'
    } else if (amount > 100000) {
      nextErrors.amount = 'Amount must be 100000 or less.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onAddExpense({
      title,
      amount,
      category: values.category,
    })
    setValues({ title: '', amount: '', category: 'Food' })
  }

  return (
    <form
      aria-label="Add expense"
      className="expense-form"
      data-cy="expense-form"
      onSubmit={handleSubmit}
    >
      <label htmlFor="expense-title">Title</label>
      <input
        id="expense-title"
        name="title"
        data-cy="title"
        aria-required="true"
        aria-invalid={Boolean(errors.title)}
        aria-describedby={errors.title ? 'expense-title-error' : undefined}
        value={values.title}
        onChange={handleChange}
      />
      {errors.title && (
        <p id="expense-title-error" role="alert" data-cy="expense-title-error">
          {errors.title}
        </p>
      )}

      <label htmlFor="expense-amount">Amount</label>
      <input
        id="expense-amount"
        name="amount"
        data-cy="amount"
        inputMode="decimal"
        aria-required="true"
        aria-invalid={Boolean(errors.amount)}
        aria-describedby={errors.amount ? 'expense-amount-error' : undefined}
        value={values.amount}
        onChange={handleChange}
      />
      {errors.amount && (
        <p id="expense-amount-error" role="alert" data-cy="expense-amount-error">
          {errors.amount}
        </p>
      )}

      <label htmlFor="expense-category">Category</label>
      <select
        id="expense-category"
        name="category"
        data-cy="category"
        aria-required="true"
        value={values.category}
        onChange={handleChange}
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <button type="submit" data-cy="add-expense">
        Add expense
      </button>
    </form>
  )
}

export default ExpenseForm
