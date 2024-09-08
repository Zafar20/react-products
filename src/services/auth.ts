import api from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ILogin, IRegister } from "../types";
import Cookies from 'js-cookie'


export const getUserData = () => {
    return useQuery(['user'], () => api.get('auth/users/profile'), {
        select:({data}) => data 
    })
}

export const registerMutation = () => {
    return useMutation((data:IRegister) => api.post('auth/register', data))
}

export const loginMutation = () => {
    return useMutation((data:ILogin) => api.post('auth/login', data), {
        onSuccess:({ data }) => {
            if(data && data.access) {
                Cookies.set('access_token', data.access, { expires: 7})
                Cookies.set('refresh_token', data.refresh, {expires: 7})
            }
        }
    })
}