import React, { FunctionComponent } from "react"
import { MenuState, Nav } from "../nav/Nav"
import { Tile } from "../tiles/Tile"
import { AppInfoDialog } from "../tiles/AppInfoDialog"
import { Route, RouteComponentProps } from "react-router-dom"
import { useQuery } from "react-query"
import { getApps } from "../logic/api"
import { RemoveApp } from "../tiles/RemoveApp"
import { SuspendApp } from "../tiles/SuspendApp"

type GridProps = RouteComponentProps<{ 
  menu?: MenuState;
}>

export const Grid: FunctionComponent<GridProps> = ({ match }) => {
  const { data } = useQuery(['apps'], () => getApps())
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 left-0 z-30 flex justify-center w-screen bg-white">
        <Nav menu={match.params.menu} path={match.path} />
      </header>

      <main className='h-full w-full flex justify-center pt-24 pb-32 relative z-0'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-8 w-full max-w-6xl">
          {data && data.map(app => (
            <Tile key={app.name} app={app} />
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