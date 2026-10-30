import { describe, expect, it } from 'vitest'
import { calculateTotal, validateExpense } from './expenses'

describe('expense validation', () => {
  it('accepts a valid expense', () => {
    expect(validateExpense('Lunch', '250', 'Food')).toBe('')
  })

  it.each(['', '   '])('rejects a blank title: %j', (title) => {
    expect(validateExpense(title, '250', 'Food')).toBe('Enter a title.')
  })

  it.each(['', 'abc', '0', '-5', 'Infinity', 'NaN', '   '])('rejects invalid amount: %j', (amount) => {
    expect(validateExpense('Lunch', amount, 'Food')).toBe('Enter an amount greater than 0.')
  })

  it('accepts the upper limit', () => {
    expect(validateExpense('Rent', '100000', 'Bills')).toBe('')
  })

  it('rejects an unknown category', () => {
    expect(validateExpense('Lunch', '250', 'Shopping')).toBe('Choose a valid category.')
  })
})

describe('total calculation', () => {
  it('returns zero for an empty list', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('adds expense amounts stored in paise', () => {
    expect(calculateTotal([{ amount: 25000 }, { amount: 40000 }])).toBe(650)
  })

  it('adds small decimal amounts accurately', () => {
    expect(calculateTotal([{ amount: 10 }, { amount: 20 }])).toBe(0.3)
  })
})

it('rejects amounts over 100000', () => {
  expect(validateExpense('Laptop', '100000.01', 'Other')).toBe('Amount cannot exceed 100000.')
})

it.each(['0.001', '1.005'])('rejects fractions smaller than a paise: %s', (amount) => {
  expect(validateExpense('Lunch', amount, 'Food')).toBe('Use up to 2 decimal places.')
})

it.each(['0x10', '1e2'])('rejects non-decimal currency notation: %s', (amount) => {
  expect(validateExpense('Lunch', amount, 'Food')).toBe('Enter a decimal amount.')
})

it('accepts a decimal amount below one rupee', () => {
  expect(validateExpense('Sample', '.50', 'Other')).toBe('')
})
