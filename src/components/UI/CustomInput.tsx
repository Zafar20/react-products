import { FC } from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form";


interface IProps {
    type: string;
    text: string;
    placeholder: string;
    register: UseFormRegisterReturn
    error: FieldError | undefined
}

const CustomInput:FC<IProps> = ({type, text,placeholder,error, register}) => {
  return (
    <>
        <div className="formlayout__item">
            <span className="formlayout__item-span">{text}</span>
            <input 
                type={type}
                className="formlayout__item-input"
                placeholder={placeholder}
                {...register}
            />
           {error &&  <h3 className="formlayout__item-error">
                {error?.message}
            </h3>}
        </div>
    </>
  )
}

export default CustomInput