import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import App from '@/routes/App';
import License from '@/routes/License';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/license',
    element: <License />,
  },
];

const router = createBrowserRouter(routes);

export default router;
