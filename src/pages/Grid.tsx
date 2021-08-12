import React, { FunctionComponent, useEffect } from "react"
import _ from 'lodash-es';
import { useQuery } from "react-query"
import { MenuState, Nav } from "../nav/Nav"
import { Tile } from "../tiles/Tile"
import { AppInfoDialog } from "../tiles/AppInfoDialog"
import { Route, RouteComponentProps } from "react-router-dom"
import { getApps } from "../logic/api"
import { RemoveApp } from "../tiles/RemoveApp"
import { SuspendApp } from "../tiles/SuspendApp"
import useDocketState, {useCharges} from "../state/docket"
import { InstallApp } from "../tiles/InstallApp"

type GridProps = RouteComponentProps<{ 
  menu?: MenuState;
}>

export const Grid: FunctionComponent<GridProps> = ({ match }) => {
  const { data } = useQuery(['apps'], () => getApps())
  const charges = useCharges();
  useEffect(() => {
    useDocketState.getState().fetchCharges();
  }, []);
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 left-0 z-30 flex justify-center w-full bg-white">
        <Nav menu={match.params.menu} />
      </header>

      <main className='h-full w-full flex justify-center pt-24 pb-32 relative z-0'>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-8 w-full max-w-6xl">
          {charges && _.map(charges, (charge, desk) => (
            <Tile key={desk} docket={charge} desk={desk} />
          ))}
        </div>
        <Route exact path="/install/:ship/:desk">
          <InstallApp />
        </Route>
        <Route exact path="/app/:desk">
          <AppInfoDialog />
        </Route>
        <Route exact path="/app/:desk/suspend">
          <SuspendApp />
        </Route>
        <Route exact path="/app/:desk/remove">
          <RemoveApp />
        </Route>
      </main>
    </div>
  )
}
