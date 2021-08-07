import React from 'react'
import type * as Polymorphic from '@radix-ui/react-polymorphic'
import classNames from 'classnames'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'

type PolymorphicButton = Polymorphic.ForwardRefComponent<'button', {
  variant?: ButtonVariant
}>

const variants: Record<ButtonVariant, string> = {
  primary: 'text-white bg-blue-400',
  secondary: 'text-blue-400 bg-blue-100',
  destructive: 'text-white bg-red-400'
}

export const Button = React.forwardRef(({ 
  as: Comp = 'button', 
  variant = 'primary',
  children,
  className,
  ...props 
}, ref) => {
  return (
    <Comp ref={ref} {...props} className={classNames('button', variants[variant], className)}>
      { children }
    </Comp>
  )
}) as PolymorphicButton;

export const PillButton = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => (
  <Button ref={ref} {...props} className={classNames('px-6 py-3 rounded-full', className)}>
    { children }
  </Button>
)) as PolymorphicButton