import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import * as Menu from '@radix-ui/react-menu';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { darken, desaturate, hsla, lighten, parseToHsla, readableColorIsBlack } from 'color2k';

export interface TileMenuProps {
  id: string;
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

const Item = React.forwardRef<HTMLDivElement, PropsWithChildren<Menu.MenuItemOwnProps>>(({ children, ...props }, ref) => (
  <DropdownMenu.Item className="px-4 py-1 leading-none mix-blend-hard-light select-none" {...props} ref={ref}>
    { children }
  </DropdownMenu.Item>
))

export const TileMenu = ({ color, className }: TileMenuProps) => {
  const [open, setOpen] = useState(false);
  const light = readableColorIsBlack(color);
  const menuColor = getMenuColor(color, light);
  const menuBg = { backgroundColor: menuColor };

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

      <DropdownMenu.Content sideOffset={4} className={classNames('min-w-[200px] p-4 space-y-4 font-semibold text-gray-800 rounded-xl', !light && 'text-gray-300')} style={menuBg}>
        <DropdownMenu.Group className="space-y-4">
          <Item>App Info</Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator className="-mx-4 my-2 border-t-2 border-solid border-gray-500 mix-blend-soft-light"/>
        <DropdownMenu.Group className="space-y-4">
          <Item>Suspend App</Item>
          <Item>Remove App</Item>
        </DropdownMenu.Group>
        <DropdownMenu.Arrow className="w-4 h-[10px] fill-current" style={{ color: menuColor }}/>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}