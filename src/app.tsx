import Mousetrap from 'mousetrap'
import { Route } from 'wouter-preact'
import { useEffect } from 'preact/hooks'
import { Grid } from './pages/Grid'

export function App() {
  useEffect(() => {
    window.name = 'grid'

    Mousetrap.bind(['command+/', 'ctrl+/'], () => {
      window.open('/?leap=search', 'grid')
    })
  }, [])

  return (
    <Route path="/">
      <Grid />
    </Route>
  )
}
