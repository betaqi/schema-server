import boot from '../boot'
import app from './index'
import TestHome from './routers/TestHome'
import Demo from './routers/Demo'
import TestSettings from './routers/TestSettings'

const routes = [
  { path: "/", element: <TestHome/> },
  { path: "/demo", element: <Demo/> },
  { path: "/settings", element: <TestSettings/> }
]

boot(app, routes)
