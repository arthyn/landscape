import qs from 'query-string'
import { Link } from 'react-router-dom'
import { FunctionComponent } from 'preact'

interface TileProps {
  color: string; 
  name: string;
  href: string;
  light?: boolean;
  img?: string;
}

export const Tile: FunctionComponent<TileProps> = ({ color, light, name, href, img }) => {
  return(
    <Link
      to={{
        pathname: href,
        search: qs.stringify({ name: name, color: color }),
      }}
      target={name} 
      className="relative before:block before:pb-[100%] rounded-xl" style={{backgroundColor: color || 'purple'}}
    >
      <a >
        <h3 className={`${light ? 'text-midWhite' : 'text-gray'} absolute bottom-4 left-4 md:bottom-7 md:left-7`}>{name}</h3>
        {
          img
            ? <img className="absolute top-1/2 left-1/2 h-[40%] w-[40%] object-contain transform -translate-x-1/2 -translate-y-1/2" src={ img } />
            : null
        }
      </a>
    </Link>
  )
}