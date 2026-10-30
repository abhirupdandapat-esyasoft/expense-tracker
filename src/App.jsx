import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import CategoryFilter from './components/CategoryFilter'
import { calculateTotal, validateExpense } from './expenses'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [form, setForm] = useState({ title: '', amount: '', category: 'Food' })
  const [filter, setFilter] = useState('All')
  const [error, setError] = useState('')

  const visibleExpenses = expenses.filter((expense) => filter === 'All' || expense.category === filter)
  const total = calculateTotal(visibleExpenses)

  function changeField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
  }

  function addExpense(event) {
    event.preventDefault()
    const message = validateExpense(form.title, form.amount, form.category)
    if (message) {
      setError(message)
      return
    }
    const expense = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      amount: Math.round(Number(form.amount) * 100),
      category: form.category,
    }
    setExpenses([...expenses, expense])
    setForm({ title: '', amount: '', category: 'Food' })
    setError('')
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  return (
    <main className="app">
      <header className="page-header">
        <p className="eyebrow">EVERYDAY SPENDING</p>
        <h1>Expense Tracker</h1>
        <p>A simple place to keep track of what you spend.</p>
      </header>
      <div className="layout">
        <section className="panel form-panel" aria-labelledby="add-heading">
          <h2 id="add-heading">Add an expense</h2>
          <p className="section-note">Start with the little things.</p>
          <ExpenseForm form={form} error={error} onChange={changeField} onSubmit={addExpense} />
        </section>
        <section className="panel expenses-panel" aria-labelledby="expenses-heading">
          <div className="list-heading">
            <h2 id="expenses-heading">Your expenses</h2>
            <CategoryFilter value={filter} onChange={(event) => setFilter(event.target.value)} />
          </div>
          <section className="summary" aria-label="Expense summary" aria-live="polite">
            <div>
              <p>{filter === 'All' ? 'Total spending' : `${filter} spending`}</p>
              <strong data-cy="total">₹{total.toFixed(2)}</strong>
            </div>
            <p data-cy="count">{visibleExpenses.length} {visibleExpenses.length === 1 ? 'expense' : 'expenses'} shown</p>
          </section>
          <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
        </section>
      </div>
      <footer>Expenses are kept until you refresh or close this page.</footer>
    </main>
  )
}

export default App
