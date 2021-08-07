import classNames from 'classnames';
import React, { FunctionComponent } from 'react'
import { App } from '../logic/api'
import { TileMenu } from './TileMenu'

type TileProps = {
  href: string;
} & App;

export const Tile: FunctionComponent<TileProps> = ({ color, light, name, href, img, status }) => {
  const active = status === 'active';
  return(
    <a
      href={active ? '#' : undefined}
      target={name} 
      className={classNames('group relative font-semibold aspect-w-1 aspect-h-1 rounded-xl', !active && 'cursor-default')} style={{backgroundColor: active ? color || 'purple' : 'rgb(245,245,245)'}}
    >
      <div>
        <TileMenu
          id={name}
          status={status}
          color={color}
          className="absolute z-10 top-4 right-4 opacity-0 focus:opacity-100 group-hover:opacity-100" 
        />
        <h3 className={`${light ? 'text-gray-200' : 'text-gray-800'} absolute bottom-4 left-4 md:bottom-8 md:left-8 mix-blend-hard-light`}>{name}</h3>
        {
          img
            ? <img className="absolute top-1/2 left-1/2 h-[40%] w-[40%] object-contain transform -translate-x-1/2 -translate-y-1/2" src={ img } />
            : null
        }
      </div>
    </a>
  )
}