import { create } from "zustand";
import { devtools } from 'zustand/middleware'


interface IFilterStore {
    sortValue: string;
    searchValue: string
    limit: number
    offset: number
    currentPage: number
    setOffSet: (val: number) => void 
    setCurrentPage: (val: number) => void 
    setSortValue: (val: string) => void
    setSearchValue: (val: string) => void
}

export const filterStore = create<IFilterStore>()(devtools(
    (set) => ({
        sortValue: '',
        searchValue: '',
        limit: 6,
        offset: 0,
        currentPage: 1,
        setOffSet: (val) => set({ offset: val }),
        setCurrentPage: (val) => set({ currentPage: val}),  
        setSearchValue: (val) => set({ searchValue: val}), 
        setSortValue: (val) => set({ sortValue: val }) 
    })
))