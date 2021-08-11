import systemUrl from '../assets/system.png'
import goUrl from '../assets/go.png'
import { App, Provider } from './api'

export const providers: Provider[] = [
  {
    shipName: '~zod',
    nickname: 'Tlon Corporation'
  },
  {
    shipName: '~nocsyx-lassul',
    status: 'technomancing an electron wrapper for urbit'
  },
  {
    shipName: '~nachus-hollyn',
  },
  {
    shipName: '~nalbel_litzod',
    status: 'congratulations'
  },
  {
    shipName: '~litmus^ritten',
  },
  {
    shipName: '~nalput_litzod',
    status: 'Queen'
  },
  {
    shipName: '~nalrex_bannus',
    status: 'Script, command and inspect your Urbit. Use TUI applications'
  },
  {
    shipName: '~nalrys',
    status: 'hosting coming soon'
  },
]

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
    provider: '~zod',
    status: 'active', 
    url: '/apps/groups', 
    description: 'Simple Software for Community Assembly', 
    color: '#CDE7EF', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Messages',
    provider: '~zod',
    status: 'active', 
    url: '/apps/messages', 
    description: 'A lengthier description of the app down here', 
    color: '#8BE789', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Calls',
    provider: '~zod',
    status: 'active',
    url: '/apps/calls', 
    description: 'A lengthier description of the app down here',
    color: '#C2D6BE', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Bitcoin Wallet', 
    provider: '~zod',
    status: 'active',
    url: '/apps/bitcoin-wallet', 
    description: 'A lengthier description of the app down here',
    color: '#F0AE70', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'System', 
    provider: '~zod',
    status: 'active',
    url: '/apps/system', 
    description: 'A lengthier description of the app down here',
    color: '#2D0118', 
    light: true, 
    img: systemUrl, 
    meta: appMetaData 
  },
  { 
    name: 'My Apps', 
    provider: '~zod',
    status: 'active',
    url: '/apps/my-apps', 
    description: 'A lengthier description of the app down here',
    color: '#D8B14E', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Go', 
    provider: '~zod',
    status: 'active',
    url: '/apps/go', 
    description: 'A lengthier description of the app down here',
    color: '#A58E52', 
    light: false, 
    img: goUrl, 
    meta: appMetaData 
  },
  { 
    name: 'Terminal',
    provider: '~zod',
    status: 'active', 
    url: '/apps/terminal', 
    description: 'A lengthier description of the app down here',
    color: '#2D382B', 
    light: true, 
    meta: appMetaData 
  },
  { 
    name: 'Pomodoro',
    provider: '~zod',
    status: 'active', 
    url: '/apps/pomodoro', 
    description: 'A lengthier description of the app down here',
    color: '#EE5432', 
    light: true, 
    meta: appMetaData 
  },
  { 
    name: 'Clocks', 
    provider: '~zod',
    status: 'active',
    url: '/apps/clocks', 
    description: 'A lengthier description of the app down here',
    color: '#DCDCDC', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Uniswap', 
    provider: '~zod',
    status: 'active',
    url: '/apps/uniswap', 
    description: 'A lengthier description of the app down here',
    color: '#FDA1FF', 
    light: false, 
    meta: appMetaData 
  },
  { 
    name: 'Inbox', 
    provider: '~zod',
    status: 'active',
    url: '/apps/inbox', 
    color: '#FEFFBA', 
    light: false, 
    meta: appMetaData 
  },
]