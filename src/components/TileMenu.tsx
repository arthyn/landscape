import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import { darken, desaturate } from 'color2k';

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

function getMenuColor(color: string): string {
  return darken(desaturate(color, .15), .075);
}

export const TileMenu = ({ color, className }: TileMenuProps) => {
  const menuColor = getMenuColor(color);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={classNames('p-3 rounded-full', className)}
        style={{ backgroundColor: menuColor }}
      >
        <MenuIcon className="w-6 h-6" />
        <span className="sr-only">Menu</span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            App Info
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            Suspend App
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            Remove App
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}