import axios from 'axios'
import Cookies from 'js-cookie'


const api = axios.create({
    baseURL: 'https://prowebapi.pythonanywhere.com/api/v1/'
})

api.interceptors.request.use(
    (config) => {
        let access_token = Cookies.get('access_token')
        if(access_token && access_token != null) {
            config.headers['Authorization'] = `Bearer ${access_token}`
        }
        return config
    }
)


export default api