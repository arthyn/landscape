import React, { FunctionComponent, useRef, useState, KeyboardEvent, FocusEvent } from "react"
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom"
import { Dialog } from "../components/Dialog"
import { DialogContent } from "@radix-ui/react-dialog"
import { SystemMenu } from "./SystemMenu"
import classNames from "classnames"
import { useCallback } from "react"
import { Search } from "./Search"
import { SystemPreferences } from "./SystemPreferences"
import { Notifications } from "./Notifications"
import { Help } from "./Help"
import create from "zustand"
import { ChangeEvent } from "react"
import { useEffect } from "react"

export type MenuState = 
  | 'closed'
  | 'search'
  | 'notifications'
  | 'help-and-support'
  | 'system-preferences' 

interface NavProps {
  menu?: MenuState;
}

interface NavStore {
  searchInput: string;
  setSearchInput: (input: string) => void;
  selection: string | null;
  select: (selection: string | null, input?: string) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  searchInput: '',
  setSearchInput: (input: string) => set({ searchInput: input }),
  selection: null,
  select: (selection: string | null, input?: string) => set({ searchInput: input || '', selection })
}))

export function createNextPath(current: string, nextPart?: string): string {
  let end = nextPart;
  const parts = current.split('/').reverse();
  if (parts[1] === 'search') {
    end = 'apps'
  }

  if (parts[0] === 'leap') {
    end = `search/${nextPart}`
  }

  return `${current}/${end}`;
}

export function createPreviousPath(current: string): string {
  const parts = current.split('/');
  parts.pop();

  return parts.join('/')
}

export const Nav: FunctionComponent<NavProps> = ({ menu = 'closed' }) => {
  const { push } = useHistory();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    searchInput,
    setSearchInput,
    selection,
    select
  } = useNavStore();
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);

  const isOpen = menu !== 'closed';
  const eitherOpen = isOpen || systemMenuOpen;

  const onOpen = useCallback((event: Event) => {
    event.preventDefault();

    if (menu === 'search' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [menu]);

  // useEffect(() => {
  //   if (!menu || menu === 'search') {
  //     select(null);
  //     inputRef.current?.focus();
  //   }
  // }, [menu]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [selection])

  function toggleMenu(state: MenuState) {
    console.log({ menu, state })
    if (selection || menu === state) {
      return;
    }

    const leap = state === 'closed' ? undefined : state;
    push(leap ? `/leap/${leap}` : '/');
  }

  const onDialogKey = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (!selection || searchInput) {
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      select(null);
      const pathBack = createPreviousPath(location.pathname);
      push(pathBack)
    }
  }, [selection, searchInput, location.pathname]);

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    debugger;
    //refocusing tab with input focused is false trigger
    const windowFocus = e.nativeEvent.currentTarget === document.body;
    if (windowFocus) {
      return;
    }

    toggleMenu('search')
  }, [])

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value.trim();
    setSearchInput(value);
  }, []);
  
  return (
    <menu className="w-full max-w-3xl my-6 px-4 text-gray-400 font-semibold">
      <div className={classNames('flex space-x-2', isOpen && 'invisible')}>
        {!isOpen &&
          <SystemMenu showOverlay open={systemMenuOpen} setOpen={setSystemMenuOpen} className={classNames('relative z-50 flex-none', eitherOpen ? 'bg-white' : 'bg-gray-100')} />
        }
        <Link to="/leap/notifications" className="relative z-50 flex-none circle-button bg-blue-400 text-white default-ring">3</Link>
        <input onClick={() => toggleMenu('search')} onFocus={onFocus} type='text' className="relative z-50 rounded-full w-full pl-4 h4 bg-gray-100 default-ring" placeholder="Search Landscape" />
      </div>
      
      <Dialog open={isOpen} onOpenChange={(open) => !open && push('/')}>
        <DialogContent onOpenAutoFocus={onOpen} className="fixed top-0 left-1/2 w-full max-w-3xl px-4 text-gray-400 -translate-x-1/2 outline-none">
          <div tabIndex={-1} onKeyDown={onDialogKey}>
            <header className="flex my-6 space-x-2">
              <SystemMenu open={systemMenuOpen} setOpen={setSystemMenuOpen} className={classNames('relative z-50 flex-none', eitherOpen ? 'bg-white' : 'bg-gray-100')} />
              <Link to="/leap/notifications" className={`relative z-50 flex-none circle-button bg-blue-400 text-white`}>3</Link>
              <div className="relative z-50 flex items-center w-full px-2 rounded-full bg-white default-ring focus-within:ring-4">
                <label htmlFor="leap" className={classNames('inline-block flex-none p-2 h4 text-blue-400', !selection && 'sr-only')}>{selection || 'Search Landscape'}</label>
                <input 
                  id="leap" 
                  type="text"
                  ref={inputRef} 
                  placeholder={selection ? '' : 'Search Landscape'} 
                  className="flex-1 w-full h-full px-2 h4 rounded-full bg-transparent outline-none"
                  value={searchInput} 
                  onClick={() => toggleMenu('search')} 
                  onFocus={onFocus} 
                  onChange={onChange}
                />
              </div>
            </header>
            <div className="grid grid-rows-[fit-content(calc(100vh-7.5rem))] bg-white rounded-3xl overflow-hidden">
              <Switch>
                <Route path="/leap/notifications" component={Notifications} />
                <Route path="/leap/system-preferences" component={SystemPreferences} />
                <Route path="/leap/help-and-support" component={Help} />
                <Route path={['/leap/search', '/leap']} component={Search}/>
              </Switch>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </menu>
  )
}