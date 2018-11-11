import React from 'react'

export const Button = ({children, className, color='black',type='button', ...props}) => (
    <button className={`${className} Button Button_${color}`} type={type} {...props}>
        {children}
    </button>

)

export const ButtonUnobtrusive= ({
    children,
    className,
    type= 'button',
    ...props
}) => (
    <button
        className={`${className} Button_unobtrusive`}
        type={type}
        {...props}
    >
        {children}
    </button>
)
