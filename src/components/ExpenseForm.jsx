import { categories } from '../expenses'

function ExpenseForm({ form, error, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" data-cy="title" value={form.title} onChange={onChange} placeholder="e.g. Lunch" aria-describedby={error ? 'form-error' : undefined} />
      <label htmlFor="amount">Amount (₹)</label>
      <input id="amount" name="amount" data-cy="amount" type="text" inputMode="decimal" value={form.amount} onChange={onChange} placeholder="0.00" aria-describedby="amount-hint" />
      <p id="amount-hint" className="field-hint">Up to ₹1,00,000 per expense. Use up to 2 decimal places.</p>
      <label htmlFor="category">Category</label>
      <select id="category" name="category" data-cy="category" value={form.category} onChange={onChange}>
        {categories.map((category) => <option key={category}>{category}</option>)}
      </select>
      {error && <p id="form-error" className="error" role="alert" data-cy="error">{error}</p>}
      <button className="add-button" type="submit" data-cy="add-expense">Add expense</button>
    </form>
  )
}

export default ExpenseForm
