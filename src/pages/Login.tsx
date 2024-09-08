import { FC, useState } from "react"
import FormLayout from "../layouts/FormLayout"
import { useForm } from "react-hook-form"
import CustomInput from "../components/UI/CustomInput"
import CustomBtn from "../components/UI/CustomBtn"
import { Link, useNavigate } from "react-router-dom"
import { ILogin } from "../types"
import { loginMutation } from "../services/auth"
import { errorMesage } from "../utils/errorMessage"


const Login:FC = () => {
  
  const { mutateAsync } = loginMutation()
  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate()
  
  const { 
      register,
      handleSubmit,
      formState: {
        errors,
        isValid
      }
    
    } = useForm<ILogin>({
      mode: 'onBlur'
    })
  
  const onSubmit = async(data: ILogin) => {
    try {
        await mutateAsync(data)
        navigate('/')
        setErrorText('')
    } catch (error) {
        setErrorText(errorMesage(error, 'login'))
        console.log(error);
        
    }
    
  }

  
  return (
    <>
      <FormLayout>
        <div className="formlayout__block">
          <h2 className="formlayout__title">Вход</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="formlayout__form">
            <CustomInput
              type="text"
              placeholder="Логин"
              text="Ваш логин"
              error={errors?.username}
              register={register('username', {
                required: "Поля обязательно к заполнению",
                minLength: {
                  value: 5,
                  message: 'Минимум 5 символов'
                }
              })}
            />
            <CustomInput
              type="password"
              placeholder="Пароль"
              text="Ваш пароль"
              error={errors?.password}
              register={register('password', {
                required: "Поля обязательно к заполнению",
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов'
                }
              })}
            />
            <CustomBtn
              text="Вход"
              width={250}
              height={60}
              ma="auto"
              disabled={!isValid}
            />
          </form>
          <div className="formlayout__info">
            {errorText && <p className="formlayout__info-error">{errorText}</p> }
            <p className="formlayout__info-text">Нет акканута?</p>
            <Link to="/register" className="formlayout__info-link">Зарегистрироваться</Link>
          </div>
        </div>
      </FormLayout>
    </>
  )
}

export default Login


