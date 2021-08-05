import React, { FunctionComponent } from "react"
import { Nav } from "../components/Nav"
import { Tile } from "../components/Tile"
import systemUrl from '../assets/system.png'
import goUrl from '../assets/go.png'
import { AppInfoDialog } from "../dialogs/AppInfoDialog"
import { Route } from "react-router-dom"

export const Grid: FunctionComponent = () => {
  return (
    <div className="flex flex-col">
      <header className={`w-full flex justify-center items-center h-24 sticky top-0 left-0 z-30`} style={{backgroundColor:'rgba(255,255,255,0.95)', backdropFilter: 'blur(50px)'}}>
        <Nav />
      </header>

      <main className='h-full w-full flex justify-center pt-24 pb-32 relative z-0'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-8 w-full max-w-6xl">
          <Tile color='#CDE7EF' name='Groups' href='/apps/groups' />
          <Tile color='#8BE789' name='Messages' href='/apps/messages' />
          <Tile color='#C2D6BE' name='Calls' href='/apps/calls' />
          <Tile color='#F0AE70' name='Bitcoin Wallet' href='/apps/bitcoin-wallet' />        
          <Tile color='#2D0118' name='System' href='/apps/system' light img={systemUrl} />
          <Tile color='#D8B14E' name='My Apps' href='/apps/my-apps' />
          <Tile color='#A58E52' name='Go' href='/apps/go' img={goUrl} />
          <Tile color='#2D382B' name='Terminal' href='/apps/terminal' light/>
          <Tile color='#EE5432' name='Pomodoro' href='/apps/pomodoro' light />
          <Tile color='#DCDCDC' name='Clocks' href='/apps/clocks' />
          <Tile color='#FDA1FF' name='Uniswap' href='/apps/uniswap'/>
          <Tile color='#FEFFBA' name='Inbox' href='/apps/inbox'/>
        </div>
        <Route path="/app-info/:appId">
          <AppInfoDialog />
        </Route>
      </main>
    </div>
  )
}