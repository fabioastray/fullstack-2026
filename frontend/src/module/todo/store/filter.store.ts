import { create } from 'zustand'
import { type Filter, FILTERS } from '../model/filter.ts'

export interface FilterStore {
  filters: Filter[]
  selectedFilter: Filter
  setFilter: (filter: Filter) => void
}

export const useFilterStore = create<FilterStore>()((set) => ({
  filters: FILTERS,
  selectedFilter: 'all',
  setFilter: (filter: Filter) => set({ selectedFilter: filter })
}))
