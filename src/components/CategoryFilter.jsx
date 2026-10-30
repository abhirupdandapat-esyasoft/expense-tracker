import { categories } from '../expenses'

function CategoryFilter({ value, onChange }) {
  return (
    <div className="filter">
      <label htmlFor="filter">Filter by category</label>
      <select id="filter" data-cy="filter" value={value} onChange={onChange}>
        {['All', ...categories].map((category) => <option key={category}>{category}</option>)}
      </select>
    </div>
  )
}

export default CategoryFilter
