import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

async function addExpense(user, title = 'Lunch', amount = '250', category = 'Food') {
  await user.type(screen.getByLabelText('Title'), title)
  await user.type(screen.getByLabelText('Amount (₹)'), amount)
  await user.selectOptions(screen.getByLabelText('Category'), category)
  await user.click(screen.getByRole('button', { name: 'Add expense' }))
}

function summary() {
  return within(screen.getByRole('region', { name: 'Expense summary' }))
}

describe('expense tracker', () => {
  it('starts with an empty list and a zero total', () => {
    render(<App />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(summary().getByText('₹0.00')).toBeInTheDocument()
    expect(screen.getByText('0 expenses shown')).toBeInTheDocument()
  })

  it('adds a valid expense and clears the form', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, '  Lunch  ', '250.50')
    expect(screen.getByRole('listitem')).toHaveTextContent('Lunch')
    expect(screen.getByRole('listitem')).toHaveTextContent('₹250.50')
    expect(screen.getByText('1 expense shown')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveValue('')
    expect(screen.getByLabelText('Amount (₹)')).toHaveValue('')
  })

  it('rejects an empty title without adding a row', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText('Amount (₹)'), '250')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a title.')
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it.each(['abc', '0', '-10', '100000.01'])('does not add invalid amount %s', async (amount) => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Lunch', amount)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(summary().getByText('₹0.00')).toBeInTheDocument()
  })

  it('updates the running total after adding two expenses', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user)
    await addExpense(user, 'Cab', '400', 'Travel')
    expect(summary().getByText('₹650.00')).toBeInTheDocument()
    expect(screen.getByText('2 expenses shown')).toBeInTheDocument()
  })

  it('filters rows, count and total, then restores all rows', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user)
    await addExpense(user, 'Cab', '400', 'Travel')
    await user.selectOptions(screen.getByLabelText('Filter by category'), 'Food')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.queryByText('Cab')).not.toBeInTheDocument()
    expect(summary().getByText('₹250.00')).toBeInTheDocument()
    expect(screen.getByText('1 expense shown')).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Filter by category'), 'All')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(summary().getByText('₹650.00')).toBeInTheDocument()
  })

  it('shows zero when a category has no expenses', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user)
    await user.selectOptions(screen.getByLabelText('Filter by category'), 'Bills')
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(screen.getByText('0 expenses shown')).toBeInTheDocument()
    expect(summary().getByText('₹0.00')).toBeInTheDocument()
  })

  it('deletes a filtered expense and keeps hidden expenses', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user)
    await addExpense(user, 'Cab', '400', 'Travel')
    await user.selectOptions(screen.getByLabelText('Filter by category'), 'Food')
    await user.click(screen.getByRole('button', { name: 'Delete Lunch' }))
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    expect(summary().getByText('₹0.00')).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Filter by category'), 'All')
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Cab')).toBeInTheDocument()
    expect(summary().getByText('₹400.00')).toBeInTheDocument()
  })

  it('deletes only one of two expenses with the same title', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user)
    await addExpense(user)
    await user.click(screen.getAllByRole('button', { name: 'Delete Lunch' })[0])
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(summary().getByText('₹250.00')).toBeInTheDocument()
  })
})

it('does not silently round a fraction of a paise', async () => {
  const user = userEvent.setup()
  render(<App />)
  await addExpense(user, 'Lunch', '0.001')
  expect(screen.getByRole('alert')).toHaveTextContent('Use up to 2 decimal places.')
  expect(screen.queryAllByRole('listitem')).toHaveLength(0)
})
