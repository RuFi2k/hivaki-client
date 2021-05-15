import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from "react-router";
import { IRoute } from "./types/router";

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('./pages/Home')),
  },
  {
    path: '/booking',
    exact: true,
    component: React.lazy(() => import('./pages/Booking')),
  },
];

const renderRoutes = () => (
  <Suspense fallback={'loading'}>
    <Switch>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
        ))}
        <Redirect to='/' />
    </Switch>
  </Suspense>
)

export default renderRoutes;