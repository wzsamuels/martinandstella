import {ComponentPropsWithoutRef} from "react";

const Button = ({children, className, onClick} : ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      onClick={onClick}
      className={`${className} border border-black bg-lightGreen  rounded-xl py-1 px-3`}
    >
      {children}
    </button>
  )
}

export default Button