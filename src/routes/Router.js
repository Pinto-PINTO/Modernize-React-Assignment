import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import USAPopulation from 'src/views/dashboard/components/USAPopulation';
import FakeStore from 'src/views/dashboard/components/FakeStore';
import Regions from 'src/views/dashboard/components/Regions';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/usa-population', exact: true, element: <USAPopulation /> },
      { path: '/fake-store', exact: true, element: <FakeStore /> },
      { path: '/regions', exact: true, element: <Regions /> },
    ],
  },
  {
    path: '/auth',
    children: [
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
    ],
  },
];

export default Router;
