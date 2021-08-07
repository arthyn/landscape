import React, { FunctionComponent, useRef, useEffect, MouseEvent } from "react"
import classnames from "classnames"
import { useHistory, useLocation } from "react-router-dom"
import qs from 'query-string'
import profileUrl from '../assets/profile.png'
import notificationsUrl from '../assets/notifications.png'
import searchUrl from '../assets/search.png'

type MenuState = 'closed' | 'profile' | 'notifications' | 'search';

const menuImages: Record<MenuState, string> = {
  'profile': profileUrl,
  'notifications': notificationsUrl,
  'search': searchUrl,
  'closed': ''
}

export const Nav: FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useHistory();
  const { search } = useLocation();
  const query = qs.parse(search);
  const menuState = (query?.leap || 'closed') as MenuState;
  const isOpen = menuState !== 'closed';

  useEffect(() => {
    if (menuState === 'search' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [menuState])

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        document.body.classList.add('overflow-hidden', 'pr-[15px]')
        document.body.classList.remove('overflow-visible') 
      } else {
        document.body.classList.add('overflow-visible')
        document.body.classList.remove('overflow-hidden', 'pr-[15px]') 
      }
    }
  }, [isOpen])

  function toggleMenu<Element>(e: MouseEvent<Element>, state: MenuState) {
    e.stopPropagation();

    const leap = state === 'closed' ? undefined : state;
    push(leap ? `/?${qs.stringify({ leap })}` : '/');
  }

  const profileClassnames = classnames({
    'z-50': menuState === 'profile',
    'z-20': menuState !== 'profile'
  })
  
  const notificationsClassnames = classnames({
    'z-50': menuState === 'notifications',
    'z-20': menuState !== 'notifications'
  })
  
  const searchClassnames = classnames({
    'z-50 bg-white': menuState === 'search',
    'z-20 bg-gray-100': menuState !== 'search'
  })
  
  const lightboxClassnames = classnames({
    'z-30 flex': isOpen,
    'hidden': !isOpen
  })

  const overlayClassnames = classnames({
    'block cursor-pointer z-10 flex': isOpen,
    'hidden': !isOpen,
  })
  
  const menuClassnames = classnames({
    'z-40 flex': isOpen,
    'hidden': !isOpen,
  })
  
  return (
    <menu className="w-full max-w-3xl flex p-0 px-4 md:px-8">
      <button onClick={(e) => toggleMenu(e, 'profile')} className={`${profileClassnames} relative flex-none circle-button mr-2 bg-avatar-britney`} />
      <button onClick={(e) => toggleMenu(e, 'notifications')} className={`${notificationsClassnames} relative flex-none circle-button mr-2 bg-blue-400 text-white`}>3</button>
      <input ref={inputRef} onClick={(e) => toggleMenu(e, 'search')} type='text' className={`${searchClassnames} relative rounded-full w-full pl-4`} placeholder="Search Landscape" />
      
      <div className={`${lightboxClassnames}  pointer-events-none bg-gray-200 fixed top-0 left-0 w-screen h-screen opacity-30`} />
      
      <div onClick={(e) => toggleMenu(e, 'closed')} className={`${overlayClassnames} bg-gray-200 fixed top-0 left-0 w-screen h-screen max-w-full opacity-30`} />
      
      <div className={`${menuClassnames} fixed flex justify-center left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none`}>
        <div className="h-auto max-h-[700px] px-4 rounded-2xl mt-20 overflow-y-auto">
          <img className="w-full rounded-2xl h-auto" src={menuImages[menuState]} />
        </div>
      </div>
    </menu>
  )
}