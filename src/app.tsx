import React, { useEffect } from 'react'
import Mousetrap from 'mousetrap'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import { Grid } from './pages/Grid'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { push } = useHistory();

  useEffect(() => {
    window.name = "grid";

    Mousetrap.bind(['command+/', 'ctrl+/'], () => {
      push('/leap/search')
    })
  }, []);

  return (
    <Switch>
      <Route path={['/leap/:menu', '/']} component={Grid} />
    </Switch>
  )
}

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/apps/grid">
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
