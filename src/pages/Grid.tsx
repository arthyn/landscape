import React, { FunctionComponent } from "react"
import { Nav } from "../components/Nav"
import { Tile } from "../components/Tile"
import { AppInfoDialog } from "../dialogs/AppInfoDialog"
import { Route } from "react-router-dom"
import { useQuery } from "react-query"
import { getApps } from "../logic/api"
import { RemoveApp } from "../dialogs/RemoveApp"
import { SuspendApp } from "../dialogs/SuspendApp"

export const Grid: FunctionComponent = () => {
  const { data } = useQuery(['apps'], () => getApps())
  return (
    <div className="flex flex-col">
      <header className={`w-full flex justify-center items-center h-24 sticky top-0 left-0 z-30`} style={{backgroundColor:'rgba(255,255,255,0.95)', backdropFilter: 'blur(50px)'}}>
        <Nav />
      </header>

      <main className='h-full w-full flex justify-center pt-24 pb-32 relative z-0'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-8 w-full max-w-6xl">
          {data && data.map(app => (
            <Tile key={app.name} {...app } href={app.url} />
          ))}
        </div>
        <Route exact path="/app/:appId">
          <AppInfoDialog />
        </Route>
        <Route exact path="/app/:appId/suspend">
          <SuspendApp />
        </Route>
        <Route exact path="/app/:appId/remove">
          <RemoveApp />
        </Route>
      </main>
    </div>
  )
}