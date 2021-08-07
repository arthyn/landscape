import systemUrl from '../assets/system.png'
import goUrl from '../assets/go.png'
import { App } from './api'

export const appMetaData = [
  { attr: 'Developer Desk', value: '~/zod/apps/landscape-groups' },
  { attr: 'Last Software Update', value: '05.11.2021' },
  { attr: 'Desk Hash', value: '0v6.nj6ls.l7unh.l9bhk.d839n.n8nlq.m2dmc.fj80i.pvqun.uhg6g.1kk0h' },
  { attr: 'Version', value: '2.0.1' },
  { attr: 'Package Size', value: '5.0 MB' },
]

export const apps: App[] = [
  { 
    name: 'Groups',
    status: 'active', 
    url: '/apps/groups', 
    description: 'Simple Software for Community Assembly', 
    color: '#CDE7EF', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Messages',
    status: 'active', 
    url: '/apps/messages', 
    color: '#8BE789', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Calls', 
    status: 'active',
    url: '/apps/calls', 
    color: '#C2D6BE', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Bitcoin Wallet', 
    status: 'active',
    url: '/apps/bitcoin-wallet', 
    color: '#F0AE70', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'System', 
    status: 'active',
    url: '/apps/system', 
    color: '#2D0118', 
    light: true, 
    img: systemUrl, 
    meta: appMetaData 
  },
  { 
    name: 'My Apps', 
    status: 'active',
    url: '/apps/my-apps', 
    color: '#D8B14E', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Go', 
    status: 'active',
    url: '/apps/go', 
    color: '#A58E52', 
    light: false, 
    img: goUrl, 
    meta: appMetaData 
  },
  { 
    name: 'Terminal',
    status: 'active', 
    url: '/apps/terminal', 
    color: '#2D382B', 
    light: true, 
    meta: appMetaData 
  },
  { 
    name: 'Pomodoro',
    status: 'active', 
    url: '/apps/pomodoro', 
    color: '#EE5432', 
    light: true, 
    meta: appMetaData 
  },
  { 
    name: 'Clocks', 
    status: 'active',
    url: '/apps/clocks', 
    color: '#DCDCDC', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Uniswap', 
    status: 'active',
    url: '/apps/uniswap', 
    color: '#FDA1FF', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Inbox', 
    status: 'active',
    url: '/apps/inbox', 
    color: '#FEFFBA', 
    light: false, 
    meta: appMetaData 
  },
]