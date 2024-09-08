import { FC } from "react"
import s from './Custom.module.scss'


interface IProps {
    text: string;
    width: number;
    height: number;
    ma?: string;
    icon?: string
    disabled?: boolean;
    mt?: string;
    onClick?: () => void;
}

const CustomBtn:FC<IProps> = ({ text,mt, width, height,ma, icon, disabled, onClick}) => {
  return (
    <>
        <button
            onClick={onClick}
            className={s.btn}
            disabled={disabled}
            style={{
                maxWidth: width,
                height: height,
                marginLeft: ma, 
                marginRight: ma,
                marginTop: mt
            }}
        >
            {icon &&  <img src={icon} alt="" /> }
            {text}
        </button>
    </>
  )
}

export default CustomBtn