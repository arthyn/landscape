import React, { HTMLAttributes } from 'react';

type ShipNameProps = {
  name: string;
} & HTMLAttributes<HTMLSpanElement>;

export const ShipName = ({ name, ...props }: ShipNameProps) => {
  const parts = name.replace('~', '').split(/[_^-]/);
  
  return (
    <span {...props}>
      <span aria-hidden>~</span>
      {/* <span className="sr-only">sig</span> */}
      <span>{parts[0]}</span>
      <span aria-hidden>-</span>
      {/* <span className="sr-only">hep</span> */}
      <span>{parts[1]}</span>
    </span>
  )
}