import React, { useState } from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { darken, hsla, lighten, parseToHsla, readableColorIsBlack } from 'color2k';
import { Link } from 'react-router-dom';
import { AppStatus, toggleAppStatus } from '../logic/api';
import { useMutation, useQueryClient } from 'react-query';

export interface TileMenuProps {
  id: string;
  status: AppStatus;
  color: string;
  className?: string;
}

const MenuIcon = ({ className }: { className: string }) => (
  <svg className={classNames('fill-current', className)} viewBox="0 0 16 16">
    <path fillRule="evenodd" clipRule="evenodd" d="M14 8.5H2V7.5H14V8.5Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M2 2.5H14V3.5H2V2.5Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M14 13.5H2V12.5H14V13.5Z" />
  </svg>
)

function getMenuColor(color: string, light: boolean): string {
  const hslaColor = parseToHsla(color);
  const satAdjustedColor = hsla(hslaColor[0], Math.max(.2, hslaColor[1]), hslaColor[2], 1);

  return light ? darken(satAdjustedColor, .10) : lighten(satAdjustedColor, .10);
}

type ItemComponent = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof DropdownMenu.Item>,
  Polymorphic.OwnProps<typeof DropdownMenu.Item>
>

const Item = React.forwardRef(({ children, ...props }, ref) => (
  <DropdownMenu.Item ref={ref} {...props} className="block w-full px-4 py-1 leading-none mix-blend-hard-light select-none" >
    { children }
  </DropdownMenu.Item>
)) as ItemComponent

export const TileMenu = ({ id, status, color, className }: TileMenuProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutate } = useMutation((id: string) => toggleAppStatus(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['apps'])
    }
  })

  const light = readableColorIsBlack(color);
  const menuColor = getMenuColor(color, light);
  const menuBg = { backgroundColor: menuColor };
  const active = status === 'active';

  return (
    <DropdownMenu.Root open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DropdownMenu.Trigger
        className={classNames(
          'flex items-center justify-center w-8 h-8 rounded-full transition-opacity duration-75',
          open && 'opacity-100',
          className
        )}
        style={menuBg}
      >
        <MenuIcon className={classNames('w-4 h-4 mix-blend-hard-light', !light && 'text-gray-100')} />
        <span className="sr-only">Menu</span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content sideOffset={4} onCloseAutoFocus={(e) => e.preventDefault()} className={classNames('min-w-[200px] p-4 space-y-4 font-semibold rounded-xl', light ? 'text-gray-800' : 'text-gray-200')} style={menuBg}>
        <DropdownMenu.Group className="space-y-4">
          <Item as={Link} to={`/app/${id}`} onSelect={(e) => { e.preventDefault(); setTimeout(() => setOpen(false), 0) }}>App Info</Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator className="-mx-4 my-2 border-t-2 border-solid border-gray-500 mix-blend-soft-light"/>
        <DropdownMenu.Group className="space-y-4">
          {active && <Item as={Link} to={`/app/${id}/suspend`} onSelect={(e) => { e.preventDefault(); setTimeout(() => setOpen(false), 0) }}>Suspend App</Item>}
          {!active && <Item onSelect={() => mutate(id)}>Resume App</Item>}
          <Item as={Link} to={`/app/${id}/remove`} onSelect={(e) => { e.preventDefault(); setTimeout(() => setOpen(false), 0) }}>Remove App</Item>
        </DropdownMenu.Group>
        <DropdownMenu.Arrow className="w-4 h-[10px] fill-current" style={{ color: menuColor }}/>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}