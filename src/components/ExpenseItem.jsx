function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <div className="expense-details">
        <span className="expense-title">{expense.title}</span>
        <span className="category-tag">{expense.category}</span>
      </div>
      <span className="expense-amount">₹{(expense.amount / 100).toFixed(2)}</span>
      <button className="delete-button" type="button" data-cy="delete-expense" aria-label={`Delete ${expense.title}`} onClick={() => onDelete(expense.id)}>Delete</button>
    </li>
  )
}

export default ExpenseItem
