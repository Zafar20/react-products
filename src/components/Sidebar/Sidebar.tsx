import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userStore } from "../../store/userStore"
import { userPhoto, menuIcon, userIcon, cartIcon, logoutIcon } from "../../utils/img"
import Modal from "../Modal/Modal"
import CustomBtn from "../UI/CustomBtn"
import s from './Sidebar.module.scss'
import SidebarSkeleton from "./SidebarSkeleton"

const links = [
    { url: '/', title: 'Меню', icon: menuIcon },
    { url: '/cart', title: 'Корзина', icon: cartIcon },
    { url: '/profile', title: 'Профиль', icon: userIcon }, 
]
let url = 'https://prowebapi.pythonanywhere.com'


const Sidebar = () => {
    
    const { user, logoutUser } = userStore(state => state)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    
    const openModal = () => {
        setShowModal(true)
    }
    
    const closeModal = () => {
        setShowModal(false)
    }
    
    const logout = () => {
        setShowModal(false)
        logoutUser()
        navigate('/login')
    }
    
    
    
  return (
    <>
        <div className={s.sitebar}>
            { user ? (
                <>
                <div className={s.sitebar__user}>
                    {!user.avatar &&  <img src={userPhoto} alt="" className={s.sitebar__user_img} />}  
                    {user.avatar &&  <img src={`${url}${user.avatar}`} alt="" className={s.sitebar__user_img} />}  
                    <h2 className={s.sitebar__user_name}>{user.username}</h2>
                    <a href={`mailto:${user.email}`} className={s.sitebar__user_email}>{user.email}</a>
                </div>
                <ul className={s.sitebar__list}>
                    {links.map((link, i) => (
                        <li key={i}>
                            <Link to={link.url} className={s.sitebar__list_link}>
                                <img src={link.icon} alt="" />
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <CustomBtn
                    text="Выйти"
                    width={117}
                    height={43}
                    icon={logoutIcon}
                    mt="auto"
                    onClick={openModal}
                />
                </>
            ) : <SidebarSkeleton/> }
        </div>
        {showModal &&  <Modal close={closeModal} logout={logout} />}
       
    </>
  )
}

export default Sidebar