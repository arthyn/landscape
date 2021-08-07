import React, { FC } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import classNames from 'classnames';

export const Dialog: FC<DialogPrimitive.DialogOwnProps> = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-black opacity-30"/>
      {children}
    </DialogPrimitive.Root>
  );
}

type DialogContentComponent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof DialogPrimitive.Content>,
  Polymorphic.OwnProps<typeof DialogPrimitive.Content> & {
    showClose?: boolean;
  }
>

export const DialogContent = React.forwardRef(
  ({ showClose = true, children, className, ...props }, forwardedRef) => (
    <DialogPrimitive.Content
      as={'section'}
      className={classNames(
        'dialog',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="relative">
        {children}
        {showClose && 
          <DialogPrimitive.Close className="absolute -top-1 -right-1 p-2 bg-gray-100 rounded-full">
            <svg className="w-3.5 h-3.5 stroke-current text-gray-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L20 20" strokeWidth="3" strokeLinecap="round"/>
              <path d="M20 4L4 20" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </DialogPrimitive.Close>
        }
      </div>
    </DialogPrimitive.Content>
  )
) as DialogContentComponent;

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;