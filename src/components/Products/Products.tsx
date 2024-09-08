import { FC, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getAllProducts } from "../../services/products"
import { filterStore } from "../../store/filterStore"
import { IProduct } from "../../types"
import Pagination from "../Pagination/Pagination"
import Search from "../Search/Search"
import Sort from "../Sort/Sort"
import ProductItem from "./ProductItem"
import s from './Products.module.scss'
import ProductsSkeleton from "./ProductsSkeleton"

const Products:FC = () => {
    
    const navigate = useNavigate()
    const location = useLocation()
    
    const { 
        sortValue, 
        searchValue, 
        setSortValue, 
        setSearchValue,
        limit,
        offset,
        currentPage,
        setOffSet,
        setCurrentPage
    } = filterStore(state => state)
    
    const { data } = getAllProducts({ sortValue, searchValue, limit, offset })
    
   const products =  data && data.results.map((item: IProduct, i:number) => <ProductItem key={item.id}{...item}/>)
   const skeleton = [...new Array(9)].map((_,i) => <ProductsSkeleton key={i}/>)
   
   
   useEffect(() => {
    
    const params = new URLSearchParams(location.search)
    setSortValue(params.get('ordering') || '')
    setSearchValue(params.get('search') || '')
    setCurrentPage(Number(params.get('page')) || 1)
    
   }, [location.search])
   
   
   useEffect(() => {
    
    setOffSet(currentPage * limit - limit)
    
    const params = new URLSearchParams()
    
    sortValue && params.set('ordering', sortValue)
    searchValue && params.set('search', searchValue)
    currentPage != 1 && params.set('page', String(currentPage))
    
    navigate(`?${decodeURIComponent(params.toString())}`)
    
   }, [sortValue, searchValue, currentPage])
   
   const changePage = (num: number) => {
    console.log(num)
    setCurrentPage(num)
    setOffSet(num * limit - limit)
   }
   
    
  return (
    <>
        <div className={s.products}>
            <div className={s.products__filter}>
                <Sort/>
                <Search/>
            </div>
            <div className={s.products__list}>
               { data ? products : skeleton}
            </div>
            {data && data.count == 0 && 
                <h2 className={s.products__title}>
                    По вашему запросу - {searchValue} ничего не найдено
                </h2>
            }
            {data && data.count > 6 && 
                <Pagination
                    limit={limit}
                    currentPage={currentPage}
                    totalCount={data.count}
                    changePage={changePage}
                />
            }
           
        </div>
    </>
  )
}

export default Products