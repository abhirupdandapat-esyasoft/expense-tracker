import ExpenseItem from './ExpenseItem'

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <div className="empty-state"><h3>No expenses here yet</h3><p>Add an expense or choose another category.</p></div>
  }

  return (
    <ul className="expense-list" data-cy="expense-list">
      {expenses.map((expense) => <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />)}
    </ul>
  )
}

export default ExpenseList
