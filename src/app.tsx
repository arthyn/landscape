import Mousetrap from 'mousetrap'
import { useEffect } from 'preact/hooks'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
        <Route path="/" component={Grid} />
      </Switch>
    </BrowserRouter>
  )
}
