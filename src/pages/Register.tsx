import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import CustomBtn from "../components/UI/CustomBtn"
import CustomInput from "../components/UI/CustomInput"
import FormLayout from "../layouts/FormLayout"
import { registerMutation } from "../services/auth"
import { IRegister } from "../types"
import { errorMesage } from "../utils/errorMessage"


const Register:FC = () => {
  
  const { mutateAsync } = registerMutation()
  
  const [errorText, setErrorText] = useState('')
  const navigate = useNavigate()
  
  
  const { 
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isValid
    }
  } = useForm<IRegister>({
    mode: 'onBlur'
  })


const password = watch('password')
  
  
const onSubmit = async(data: IRegister) => {
    try {
        await mutateAsync(data)
        setErrorText('') 
        navigate('/login')
    } catch (error) {
      setErrorText(errorMesage(error))
      console.log(error);
    }
}


return (
  <>
    <FormLayout>
      <div className="formlayout__block">
        <h2 className="formlayout__title">Регистрация</h2>
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
            type="email"
            placeholder="Почта"
            text="Ваша почта"
            error={errors?.email}
            register={register('email', {
              required: "Поля обязательно к заполнению",
            })}
          />
          <CustomInput
            type="password"
            placeholder="Ваш пароль"
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
          <CustomInput
            type="password"
            placeholder="Повторите пароль"
            text="Повторите пароль"
            error={errors?.password2}
            register={register('password2', {
              required: "Поля обязательно к заполнению",
              validate: (value) => value == password || "Пароли не совпадают",
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
          <p className="formlayout__info-text">Есть акканут?</p>
          <Link to="/login" className="formlayout__info-link">Войти</Link>
        </div>
      </div>
    </FormLayout>
  </>
)
  
}

export default Register