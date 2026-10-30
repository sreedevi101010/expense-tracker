const categories = ['All', 'Food', 'Travel', 'Bills', 'Other']

// Receives the selected category and change callback; filter state stays in App.
function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-control">
      <label htmlFor="expense-filter">Filter by category</label>
      <select
        id="expense-filter"
        data-cy="filter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
