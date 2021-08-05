import React, { useEffect } from 'react'
import Mousetrap from 'mousetrap'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Grid } from './pages/Grid'

export function App() {
  useEffect(() => {
    window.name = 'grid'

    Mousetrap.bind(['command+/', 'ctrl+/'], () => {
      window.open('/?leap=search', 'grid')
    })
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Grid />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
