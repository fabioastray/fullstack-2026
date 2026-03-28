import { useFilterStore } from '../../store/filter.store.ts'
import styles from './todo-filter.module.css'

export function TodoFilter() {
  const { filters, selectedFilter, setFilter } = useFilterStore()

  return (
    <div className={styles.filterRow}>
      {filters.map((f) => (
        <button
          key={f}
          className={`${styles.filterButton} ${selectedFilter === f ? styles.active : ''}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
