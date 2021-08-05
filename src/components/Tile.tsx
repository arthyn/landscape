import qs from 'query-string'
import React, { FunctionComponent } from 'react'
import { TileMenu } from './TileMenu'

interface TileProps {
  color: string; 
  name: string;
  href: string;
  light?: boolean;
  img?: string;
}

export const Tile: FunctionComponent<TileProps> = ({ color, light, name, href, img }) => {
  return(
    <a
      href="#"
      target={name} 
      className="group relative font-semibold before:block before:pb-[100%] rounded-xl" style={{backgroundColor: color || 'purple'}}
    >
      <TileMenu
        id={name}
        color={color}
        className="absolute z-10 top-4 right-4 opacity-0 focus:opacity-100 group-hover:opacity-100" 
      />
      <h3 className={`${light ? 'text-gray-300' : 'text-gray-800'} absolute bottom-4 left-4 md:bottom-8 md:left-8 mix-blend-hard-light`}>{name}</h3>
      {
        img
          ? <img className="absolute top-1/2 left-1/2 h-[40%] w-[40%] object-contain transform -translate-x-1/2 -translate-y-1/2" src={ img } />
          : null
      }
    </a>
  )
}