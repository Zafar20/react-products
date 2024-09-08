import api from "./api";
import { useQuery } from "@tanstack/react-query";

interface Params {
    sortValue: string
    searchValue: string
    limit: number
    offset: number
}

export const getAllProducts =  ({sortValue, searchValue, limit, offset}: Params) => {
    return useQuery(['products', sortValue, searchValue, offset], () => api.get(`products?ordering=${sortValue}&search=${searchValue}&limit=${limit}&offset=${offset}`), {
        select: (response) => response.data 
    })
}


export const getProductById = (id: number) => {
    return useQuery(['product', id], () => api.get(`products/${id}`), {
        select: (response) => response.data
    })
}