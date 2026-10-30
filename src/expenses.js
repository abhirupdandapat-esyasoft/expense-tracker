export const categories = ['Food', 'Travel', 'Bills', 'Other']

export function validateExpense(title, amount, category) {
  if (!title.trim()) return 'Enter a title.'
  const value = Number(amount)
  if (!Number.isFinite(value) || value <= 0) return 'Enter an amount greater than 0.'
  if (value > 100000) return 'Amount cannot exceed 100000.'
  if (!/^\d*\.?\d*$/.test(amount.trim())) return 'Enter a decimal amount.'
  if (amount.trim().split('.')[1]?.length > 2) return 'Use up to 2 decimal places.'
  if (!categories.includes(category)) return 'Choose a valid category.'
  return ''
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0) / 100
}
