import { FC, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Select, { StylesConfig } from 'react-select'
import { filterStore } from "../../store/filterStore"
import s from './Sort.module.scss'

const options = [
  { value: '', label: 'Все товары' },
  { value: 'title', label: 'По названию' },
  { value: 'price', label: 'По цене' },
  { value: 'rating', label: 'По рейтингу'}
]


const Sort:FC = () => {
  
  const { setSortValue, setCurrentPage } = filterStore(state => state)
  const [selectedOption, setSelectedOption] = useState('')
  const location = useLocation()
  
  const  changeSort = (option: any) => {
    setSelectedOption(option)
    setSortValue(option.value)
    setCurrentPage(1)
  }
  
  const customStyles:StylesConfig =  {
      control: (styles) => ({
        ...styles,
        border: '1px solid #efefef',
        borderRadius: '10px',
        width: '187px',
        height: '37px',
        fontSize: '14px',
        color: '#9aa0b4'
      })
  }
  
  useEffect(() => {
    
    const params = new URLSearchParams(location.search)
    const value = params.get('ordering')
    if(value) {
      const obj = options.find((option) => option.value == value)
      setSelectedOption(obj)
    }
    
  }, [location.search])
  
  
  return (
    <>
      <div className={s.sort}>
        <h1 className={s.sort__title}>Меню</h1>
        <Select
          value={selectedOption}
          options={options}
          placeholder="Сортировать по:"
          styles={customStyles}
          onChange={changeSort}
        />
      </div>
    </>
  )
}

export default Sort